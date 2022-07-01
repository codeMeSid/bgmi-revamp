import * as mongoose from "mongoose";

interface PlayerAttrs {
  name: string;
  src: string;
  key: string;
  shortName: string;
}

export interface PlayerDoc extends mongoose.Document {
  name: string;
  shortName: string;
  src: string;
  key: string;
  status: boolean;
  matches: Array<{
    matchDetail: any;
    teamDetail: any;
    playerDetail: {
      src: string;
      position: number;
      finishes: number;
      isAlive: boolean;
      onDate: {
        dead: Date;
      };
    };
  }>;
}

interface PlayerModel extends mongoose.Model<PlayerDoc> {
  build(attrs: PlayerAttrs): PlayerDoc;
}

const PlayerSchema = new mongoose.Schema(
  {
    name: String,
    shortName: String,
    src: String,
    key: String,
    status: { type: Boolean, default: true },
    matches: [
      {
        matchDetail: { type: mongoose.SchemaTypes.ObjectId, ref: "matches" },
        teamDetail: { type: mongoose.SchemaTypes.ObjectId, ref: "teams" },
        playerDetail: {
          src: String,
          position: Number,
          finishes: Number,
          isAlive: Boolean,
          onDate: {
            dead: Date,
          },
        },
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

PlayerSchema.statics.build = (attrs: PlayerAttrs) => new Player(attrs);

export const Player = mongoose.model<PlayerDoc, PlayerModel>(
  "players",
  PlayerSchema
);
