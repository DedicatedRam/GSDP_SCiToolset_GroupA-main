// Main JS file
let data;

// Runs on start
(() => {
    let api = new APIData();

    // Checks for the API loading then creates a MissionData object, data.data is the main data array.
    let checkAPILoaded = setInterval(()=>{
        if(api.loaded == true) {
            data = (new MissionData(api.products)).data;
            console.log(data);
            loopShape();

            clearInterval(checkAPILoaded);
        }
    }, 100)

})();

function loopShape(){
    data.forEach(d => {
      getCoOrds(d.corners);
      console.log(d.corners);
  });
}

function getCoOrds(item){
  genShape(item[0].y, item[0].x, item[1].y, item[1].x, item[2].y, item[2].x, item[3].y, item[3].x);
}