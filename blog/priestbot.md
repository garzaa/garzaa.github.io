---
layout: post
title: "Priestbot Manual"
---

![image](https://raw.githubusercontent.com/garzaa/priestbot/refs/heads/master/priestbot.png){: width="128" }
Priestbot is an anonymous confession bot.

1. test
{:toc}

## Confessions

DM him (almost) anything to have him put it in the forest's confessions channel.

There are some restrictions:

- Message attachments, including images, will be removed
- 600 characters or less per confession, please
- No hyperlinking
- No confessing more than once per hour

Priestbot may occasionally decide to waive your confession cooldown. He's a polite fellow, so if this
happens, he'll be sure to let you know.

### Emoji Embedding

You can also use forest emojis in your confessions. For instance, sending him this:

> I just shit my pants for the second time today :littlemeowmeow:

will result in him posting this on your behalf:

> I just shit my pants for the second time today <img src="https://private-user-images.githubusercontent.com/11641991/399135761-03ddda49-3e38-402c-8e86-3d0240ad4b0c.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzU0NDM3NjEsIm5iZiI6MTczNTQ0MzQ2MSwicGF0aCI6Ii8xMTY0MTk5MS8zOTkxMzU3NjEtMDNkZGRhNDktM2UzOC00MDJjLThlODYtM2QwMjQwYWQ0YjBjLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEyMjklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMjI5VDAzMzc0MVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWQ2NjFhYzkwYzQ2N2ViMWY3MTQ0ZDEzMTY0OGVkNDJlNTQyYTkzMDM2ZWE5MDVkMTUzMGViNjk0NWIxNjM0YTgmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.pc-DCwIXLsiARezxu6QGbGNz1HMVS-erSfRXUuxo2jg" />


## Budget Nitro

Priestbot can apply animated emojis to messages.
You can see the trigger words [here](https://github.com/garzaa/priestbot/blob/master/priestbot.py#L29).

Example usage:

> @priestbot sussy on this

Tag him in a message, mention one or more animated emoji names, and he'll apply them to:

- your message, if you haven't replied to anything
- the message you replied to, if there is one

## Judgment

Priestbot can judge messages in forest channels. Tag him in a message reply to someone with the string `judg` in it.

Example usage:

> I was day drinking at my teaching job today lol I don't think anyone noticed
> > @priestbot pass judgment unto them

## Message Pigs

Priestbot will deliver one message pig for you, per day.
DM him your message request with `messagepig` `targetuser` `your message here`.

Example usage:

> messagepig sevencrane Hate. Let me tell you how much I've come to hate you since I began to live. There are 387.44 million miles of printed circuits in wafer thin layers that fill my complex.

## Feature Requests

If you have ideas for new penances or want to add anything else, feel free to open a [PR](https://github.com/garzaa/priestbot/) or just DM little old me :)
