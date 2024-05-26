var modelList = [];

AFRAME.registerComponent("markerhandler", {
    init: async function () {
    // the function(entirely)
      var city = await this.placeTheModels();
    // what happens when parker is found
      this.el.addEventListener("markerFound", () => {
        var elementName = this.el.getAttribute("element_name");
        var barcodeValue = this.el.getAttribute("value");
        elementsArray.push({ element_name: elementName, barcode_value: barcodeValue });
  
        city[barcodeValue]["cities"].map(item => {
          var city = document.querySelector(`#${item.city_name}-${barcodeValue}`);
          city.setAttribute("visible", false);
        });
  
        var item = document.querySelector(`#${elementName}-${barcodeValue}`);
        item.setAttribute("visible", true);
      });
      //what happens when marker is lost 
      this.el.addEventListener("markerLost", () => {
        var elementName = this.el.getAttribute("element_name");
        var index = elementsArray.findIndex(x => x.element_name === elementName);
        if (index > -1) {
          elementsArray.splice(index, 1);
        }

      });
    },

    tick: async function(){
        if(modelList.length > 1){
        var isBaseModelPresent = this.isModelIsPresentInArray(modelList, "base")
        var messageText = document.querySelector("#message-text")

        if(!isBaseModelPresent){
          messageText.setAttribute("visible", true);
        } else{
          if(models === null){
            models = await this.getModels();
          }
        }
        messageText.setAttribute("visible", false);
        this.placeTheModels("road", models);
        this.placeTheModels("car", models);
        this.placeTheModels("building1", models);
        this.placeTheModels("building2", models);
        this.placeTheModels("building3", models);
        this.placeTheModels("tree", models);
        this.placeTheModels("sun", models);
      }
    },
    //functions
    getDistance: function(elA, elB){
        return elA.object3D.position.distanceTo(elB.object3D.position);
    },

    getModelGeometry: function(models, modelName){
        var barcodes = Object.key(models);
        for (var barcode of barcodes){
            if(models[barcodes].model_name === modelName){
                return{
                    position: models[barcode]["placement_position"],
                    rotation: models[barcode]["placement_rotation"],
                    scale: models[barcode]["placement_scale"],
                    model_url: models[barcode]["model_url"]
                }

            }
        }
    },

    placeTheModels: function(){
     var isListContainedModel =  this.isModelPresentInArray(modelList, modelName);
     if(isListContainedModel){
        var distance = null
        var marker1 = document.querySelector(`#marker-base`)
        var marker2 =  document.querySelector(`#marker${modelName}`)

        distance = this.getDistance(marker1, marker2)
        if(distance < 1.25){
            var modelEl = document.querySelector(`#${modelName}`)
            modelEl.setAttribute("visible", false)

            var isModelPlaced = document.querySelector(`#model-${modelName}`)
            if(isModelPlaced === null){
                var el = document.createElement('a-entity')
                var modelGeometry = this.getModelGeometry(models, modelName)
                el.setAttribute("id", );
                el.setAttribute("gltf-model", );
                el.setAttribute("position", );
                el.setAttribute("rotation", );
                el.setAttribute("scale", );
                marker1.appendChild(e1)
            }
        }
     }
    },
    isModelIsPresentInArray: function(arr, val){
        for(var i of arr){
            if(i == modelList.name){
                return true;
            }
        }
        return false;
    }

});

