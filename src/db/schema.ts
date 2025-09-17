import { pgTable, text, timestamp, uuid, integer, real, boolean } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const documents = pgTable("documents", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  source: text("source").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const chunks = pgTable("chunks", {
  id: uuid("id").defaultRandom().primaryKey(),
  documentId: uuid("document_id").references(() => documents.id).notNull(),
  userId: text("user_id").notNull(),
  content: text("content").notNull(),
  embedding: sql`vector(3072)`,
  chunkIndex: integer("chunk_index").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const questions = pgTable("questions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  stem: text("stem").notNull(),
  choices: text("choices").notNull(), // JSON string array
  answerIndex: integer("answer_index").notNull(),
  explanation: text("explanation").notNull(),
  tags: text("tags"), // comma-separated tags or JSON
  difficulty: integer("difficulty").default(2).notNull(), // 1-5
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const attempts = pgTable("attempts", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  questionId: uuid("question_id").references(() => questions.id).notNull(),
  isCorrect: boolean("is_correct").notNull(),
  selectedIndex: integer("selected_index").notNull(),
  timeMs: integer("time_ms").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const reviews = pgTable("reviews", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  questionId: uuid("question_id").references(() => questions.id).notNull(),
  ease: real("ease").default(2.5).notNull(),
  intervalDays: real("interval_days").default(0).notNull(),
  dueAt: timestamp("due_at"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
