/* Author/Contributors: Saddha Santanaporn
*  Date: 2/9/2016
*  Purpose: Manages all GameObjects
*/
var Matter = require('../matter.js');

var GameObjectManager = function () {
    this.GameObjectList = [];
    this.RemoveList = [];
    this.engine;
};  
  
GameObjectManager.prototype.AddObject = function (object) {
    this.GameObjectList.push(object);
};

GameObjectManager.prototype.UpdateAll = function (delta) {
    for (var i = 0; i < this.RemoveList.length; i++) {
        Matter.Composite.remove(this.engine.world, this.RemoveList[i].physicsComponent);
    }
    this.RemoveList.length = 0;

    for (var i = 0; i < this.GameObjectList.length; i++)
    //TODO (EVERYONE) We need to type everything so I can go by class in the gameObjectList
    
        this.GameObjectList[i].ServerPlayer.update(delta);
};

GameObjectManager.prototype.GetGameObjectFromBody = function (body) {
    for (var i = 0; i < this.GameObjectList.length; i++) {
        if (this.GameObjectList[i].physicsComponent == body)
            return this.GameObjectList[i];
    }
    return null;
};

GameObjectManager.prototype.findObject = function(id){
    for (var i = 0; i < this.GameObjectList.length; i++) {
        if (this.GameObjectList[i].ServerPlayer.id == id)
            return this.GameObjectList[i];
    }
    return null;


};
GameObjectManager.prototype.remove = function (id) {
    var gameObject=this.findObject(id);
    this.RemoveList.push(gameObject);
    Matter.Body.setPosition(gameObject.ServerPlayer.physicsComponent, Matter.Vector.create(1000, 1000));
    var index = this.GameObjectList.indexOf(gameObject);
    if (index > -1) {
        this.GameObjectList.splice(index, 1);
    }
};
module.exports=global.GameObjectManager=GameObjectManager;
 
