import { TextEncoder, TextDecoder } from 'util'
import { u8aConcat } from '@hoprnet/hopr-utils'

const textEncoder = new TextEncoder()
const textDecoder = new TextDecoder()

export type IMessage = {
  from: string
  text: string
}

export class Message extends Uint8Array {
  subarray(begin: number, end?: number): Uint8Array {
    return new Uint8Array(this.buffer, begin + this.byteOffset, end != null ? end - begin : undefined)
  }

  toU8a(): Uint8Array {
    return new Uint8Array(this)
  }

  toJson(): IMessage {
    try {
      const from = this.subarray(0, 53)
      const text = this.subarray(53, this.length)

      return {
        from: textDecoder.decode(from),
        text: textDecoder.decode(text),
      }
    } catch (err) {
      console.error(err)
      throw Error('Unable to decode message')
    }
  }

  static fromJson(message: IMessage): Message {
    const from = textEncoder.encode(message.from)
    const text = textEncoder.encode(message.text)

    return new Message(u8aConcat(from, text))
  }
}
