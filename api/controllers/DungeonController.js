/**
 * DungeonController
 *
 * @description :: Server-side logic for managing dungeons
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  findOne: function(req, res) {
    var dungeonID = req.param('id');

    Dungeon
      .findOne(dungeonID)
      .populate('locations')
      .then(function(dungeon) {
        var dungeonLocations = DungeonLocation.find({
          id: _.pluck(dungeon.locations, 'id')
        })
        .populate('items')
        .then(_.identity);

        return [dungeon, dungeonLocations];
      })
      .spread(function(dungeon, dungeonLocations) {
        dungeon.locations = dungeonLocations;
        res.send(dungeon);
      })
      .catch(function(err) {
        if (err) return res.serverError(err);
      });
  }
};
