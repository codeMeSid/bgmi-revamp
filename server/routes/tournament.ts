import { CustomError } from "../func/error";
import { DomainApi } from "../func/router/domainApi";
import { generateKey } from "../func/utils/generateKey";
import { Tournament } from "../model/tournamentModel";

export const tournamentRoutes: Array<DomainApi> = [
  {
    url: "/get/all",
    method: "get",
    middlewares: [],
    controllerFunc: async (req, res) => {
      const tournaments = await Tournament.find({ status: true });
      res.json({ success: true, payload: tournaments });
    },
  },
  {
    url: "/get/:tournamentKey",
    method: "get",
    middlewares: [],
    controllerFunc: async (req, res) => {
      const { tournamentKey } = req.params;
      const tournament = await Tournament.findOne({
        key: tournamentKey,
      })
        .populate("players", "key name shortName src", "players")
        .populate("teams", "key name shortName src", "teams")
        .populate("phases.teams.teamDetail", "key name shortName src", "teams")
        .populate(
          "phases.teams.players.playerDetail",
          "key name shortName src",
          "players"
        );
      res.json({ success: true, payload: tournament });
    },
  },
  {
    url: "/add",
    method: "post",
    middlewares: [],
    controllerFunc: async (req, res) => {
      const { name, awards, teams, players } = req.body.payload;
      const transformedAwards: any = {};
      awards.forEach((award: any, index: number) => {
        transformedAwards[index + 1] = award;
      });
      const tournament = Tournament.build({
        name,
        key: generateKey(),
        awards: transformedAwards,
        players: players.map((player: any) => player.id),
        teams: teams.map((team: any) => team.id),
      });
      await tournament.save();
      res.json({ success: true, payload: tournament });
    },
  },
  {
    url: "/update/:tournamentKey",
    method: "put",
    middlewares: [],
    controllerFunc: async (req, res) => {
      const { tournamentKey } = req.params;
      const tournament = await Tournament.findOne({
        key: tournamentKey,
        status: true,
      });
      if (!tournament)
        throw new CustomError("BadRequestError", ["Invalid Tournament Update"]);
      const { name, awards, teams, players } = req.body.payload;
      const transformedAwards: any = {};
      awards.forEach((award: any, index: number) => {
        transformedAwards[index + 1] = award;
      });
      tournament.name = name;
      tournament.awards = transformedAwards;
      tournament.players = players.map((player: any) => player.id);
      tournament.teams = teams.map((team: any) => team.id);
      await tournament.save();
      res.json({ success: true, payload: tournament });
    },
  },
  {
    url: "/delete/:tournamentKey",
    method: "delete",
    middlewares: [],
    controllerFunc: async (req, res) => {
      const { tournamentKey } = req.params;
      const tournament = await Tournament.findOne({ key: tournamentKey });
      if (!tournament)
        throw new CustomError("BadRequestError", ["Invalid Tournament Update"]);
      tournament.status = false;
      await tournament.save();
      res.json({ success: true, payload: tournamentKey });
    },
  },
];
