class Mailgun {
  constructor(FormData) {}
  client(Options) {
    return new Client();
  }
}
class Client {
  messages = new messages();
}
class messages {
  async create(domain, data) {}
}
module.exports = Mailgun;