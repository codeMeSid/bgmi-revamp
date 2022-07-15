import { TeamDoc } from "./teamModel";
import * as mongoose from "mongoose";
import { PlayerDoc } from "./playerModel";
import { ThemeDoc } from "./themeModel";

export enum MatchStatus {
  UPCOMING = "upcoming",
  STARTED = "started",
  STOPPED = "stopped",
}

interface MatchAttrs {
  name: string;
  map: { name: string; src: string };
  key: string;
  awards: Map<number, number>;
  theme: any;
  teams: Array<{ teamDetail: any; players: Array<{ playerDetail: any }> }>;
}

export interface MatchDoc extends mongoose.Document {
  name: string;
  map: { name: string; src: string };
  key: string;
  status: MatchStatus;
  theme: ThemeDoc;
  awards: Map<number, number>;
  teams: Array<{
    teamDetail: TeamDoc;
    position: number;
    players: Array<{
      playerDetail: PlayerDoc;
      status: boolean;
      finishes: number;
      onDate: {
        dead: Date;
      };
    }>;
  }>;
  onDate: {
    started: Date;
    stopped?: Date;
  };
}

interface MatchModel extends mongoose.Model<MatchDoc> {
  build(attrs: MatchAttrs): MatchDoc;
}

const MatchSchema = new mongoose.Schema(
  {
    name: String,
    map: { name: String, src: String },
    key: String,
    status: {
      type: String,
      enum: Object.values(MatchStatus),
      default: MatchStatus.UPCOMING,
    },
    theme: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "themes",
    },
    awards: mongoose.Schema.Types.Map,
    teams: [
      {
        teamDetail: { type: mongoose.SchemaTypes.ObjectId, ref: "teams" },
        position: { type: Number, default: -1 },
        players: [
          {
            playerDetail: {
              type: mongoose.SchemaTypes.ObjectId,
              ref: "players",
            },
            status: { type: Boolean, default: true },
            finishes: { type: Number, default: 0 },
            onDate: {
              dead: Date,
            },
          },
        ],
      },
    ],
    onDate: {
      started: Date,
      stopped: Date,
    },
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

MatchSchema.statics.build = (attrs: MatchAttrs) => new Match(attrs);

export const Match = mongoose.model<MatchDoc, MatchModel>(
  "matches",
  MatchSchema
);
