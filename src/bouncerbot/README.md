# BouncerBot

BouncerBot is an instance of the [HOPR chat bot](https://github.com/hoprnet/hopr-chatbot), for use in the Week #2 bounty of the #HOPRgames testing and community outreach program.
The bot can receive messages from users, respond, and parse tweets in exchange for a prize.

## Story

In the fiction of the game, particpants are trying to gain access to a #HOPRgames party, guarded by BouncerBot. 
On talking to BouncerBot and mentioning the party, the participant learns that it is limiting entry based on a guestlist, but get no further information.

After waiting a short while, the participant will be contacted by an anonymous helper, who explains that BouncerBot's guestlist is made up of people who have tweeted about #HOPRgames (including their HOPR address).

On making a tweet and sending the URL to BouncerBot, the participant will get acess to the party, and told to wait again.

After another short delay, the participant will be greeted by their anonymous helper, and told how to claim their 10DAI prize.

In the end, the helper is revealed to be BouncerBot in disguise, demonstrating how HOPR lets people share their sending address or keep it private.

## Logic

Conversation with BouncerBot occurs in three stages. Participants' addresses are stored to track their progress.

To start with, BouncerBot will wait for a message including the string `party`. Messages which don't contain this string will trigger a prompt to get the participant to include it.

Once `party` has been mentioned, BouncerBot will cycle through messages outlining the story of the game, eventually instructing users to wait.

After at least two of these messages has been sent, a countdown is triggered. Once it reaches zero, BouncerBot sends the participant messages with explicit instructions about what to tweet to win a prize. These messages are sent without an address, so participants cannot see that they come from BouncerBot.

The next time the user messages BouncerBot, it will check whether the message contains a URL. If it does, it will check whether the URL links to a tweet, and whether that tweet contains the necessary components to earn a prize. These are:

* Participant's HOPR address
* The #HOPRgames hashtag

If the participant's message meets these criteria, they'll proceed to the final dialogue sequence. If not, the BouncerBot will respond with hints about how to correct the message.

In the final sequence, BouncerBot congratulates the participant and sends a link for automated payout of their prize. These final messages are again sent without an identifying address.

Participants must turn on the `includeRecipient` (or manually prepend their address) for BouncerBot to be able to reply.
