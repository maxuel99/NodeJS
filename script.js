function luckyDraw(player) {
    return new Promise((resolve, reject) => {
      const win = Boolean(Math.round(Math.random()));
  
      process.nextTick(() => {
        if (win) {
          resolve(`${player} won a prize in the draw!`);
        } else {
          reject(new Error(`${player} lost the draw.`));
        }
      });
    });
  }

async function getResults() {
    try {console.log(await luckyDraw('Tina'))}
    catch(e) {console.error(e.message)}

    try {console.log(await luckyDraw('Jorge'))}
    catch(e) {console.error(e.message)}

    try {console.log(await luckyDraw('Julien'))}
    catch(e) {console.error(e.message)}
}

getResults();
