import type { Message } from "./Message"
import type { User } from "./User"

export type Conversation = {
  id: number,
  user: User,
  title: string,
  startedAt: Date,
  updatedAt: Date,
  endedAt: Date,
  active: boolean,
  messages: Message[]
}