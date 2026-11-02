export class TeleChat {
  private token = "YOUR_BOT_TOKEN";
  private chatId = "833144067";

  constructor() {}

  async sendMessage(text: string) {
    const response = await fetch(
      `https://api.telegram.org/bot${this.token}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: this.chatId,
          text,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok || !result.ok) {
      throw new Error(JSON.stringify(result));
    }

    console.log("Message sent successfully!");
  }
}