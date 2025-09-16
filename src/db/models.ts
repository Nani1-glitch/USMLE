import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    name: { type: String },
  },
  { timestamps: true }
);

const DocumentSchema = new Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    source: { type: String, required: true },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: false } }
);

const ChunkSchema = new Schema(
  {
    documentId: { type: Schema.Types.ObjectId, ref: "Document", required: true },
    userId: { type: String, required: true },
    content: { type: String, required: true },
    embedding: { type: [Number], default: [], index: false },
    chunkIndex: { type: Number, required: true },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: false } }
);

const QuestionSchema = new Schema(
  {
    userId: { type: String, required: true },
    stem: { type: String, required: true },
    choices: { type: [String], required: true },
    answerIndex: { type: Number, required: true },
    explanation: { type: String, required: true },
    tags: { type: [String], default: [] },
    difficulty: { type: Number, default: 2 },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: false } }
);

const AttemptSchema = new Schema(
  {
    userId: { type: String, required: true },
    questionId: { type: Schema.Types.ObjectId, ref: "Question", required: true },
    isCorrect: { type: Boolean, required: true },
    selectedIndex: { type: Number, required: true },
    timeMs: { type: Number, required: true },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: false } }
);

const ReviewSchema = new Schema(
  {
    userId: { type: String, required: true },
    questionId: { type: Schema.Types.ObjectId, ref: "Question", required: true },
    ease: { type: Number, default: 2.5 },
    intervalDays: { type: Number, default: 0 },
    dueAt: { type: Date },
  },
  { timestamps: { updatedAt: "updatedAt", createdAt: false } }
);

export const UserModel = models.User || mongoose.model("User", UserSchema);
export const DocumentModel = models.Document || mongoose.model("Document", DocumentSchema);
export const ChunkModel = models.Chunk || mongoose.model("Chunk", ChunkSchema);
export const QuestionModel = models.Question || mongoose.model("Question", QuestionSchema);
export const AttemptModel = models.Attempt || mongoose.model("Attempt", AttemptSchema);
export const ReviewModel = models.Review || mongoose.model("Review", ReviewSchema);
