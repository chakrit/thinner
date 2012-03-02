
// Edit this to your liking
CMD = 'thin -p3000 start'


// ----
var cp = require('child_process')
  , child = { };

// spawns one instance of CMD
var spawnOne = function(lastErr, lastStdout, lastStderr) {
  console.log("Exited.");
  if (lastErr) console.log(lastErr);
  if (lastStderr) console.log(lastStderr);

  console.log("\r\n\r\nRestarting...\r\n" + CMD);
  child = cp.exec(CMD, spawnOne);

  // bridge stdout
  child.stdout.on('data', function(data) {
    process.stdout.write(data);
  });
};

// keypresses trigger restart
process.openStdin().on('data', function(chunk) {
  child.kill();
});

spawnOne();
