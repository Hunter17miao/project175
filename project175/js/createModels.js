AFRAME.registerComponent("city", {
    init: async function () {
  
        //Call the function
        this.createModel(element);
    },


    createModel: async function (model) {

        //Element data
        var barcodeValue = element.barcode_value;
        var modelUrl = element.model_url;
        var modelName = element.model_name;
    
    
        //Scene
        var scene = document.querySelector("a-scene");
    
        //Add marker entity for BARCODE marker
        var marker = document.createElement("a-marker");
    
        marker.setAttribute("id", `marker-${barcodeValue}`);
        marker.setAttribute("type", "barcode");
        marker.setAttribute("element_name", elementName);
        marker.setAttribute("value", barcodeValue);
        scene.appendChild(marker);
    
        if(barcodeValue === 0){
            var modelEl = document.createElement("a-entity")
            modelEl.setAttribute("id", `${modelName}`)
            modelEl.setAttribute("geometry", {
                primitive: "box",
                width: model.width,
                height:model.height
            });

            model.setAttribute("position", model.position)
            model.setAttribute("rotation", model.rotation)
            model.setAttribute("material",{
                color: model.color,
            })
            marker.appendChild(modelEl);
        }
        
        else{
        var modelEl = document.createElement("a-entity")
        modelEl.setAttribute("id", `marker-${barcodeValue}`);
        modelEl.setAttribute("type", "barcode");
        modelEl.setAttribute("element_name", elementName);
        modelEl.setAttribute("value", barcodeValue);
        marker.appendChild(modelEl);
        }
    },
});  