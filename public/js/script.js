$("#anotar").on("click", async function () {
  let chore = $("#chore").val();
  if (chore.length > 0) {
    try {
      await axios.post("/", { chore });
      location.reload();
    } catch (error) {
      console.log(error.message);
    }
  } else {
    alert("Ingrese una tarea");
  }
});

let id = $("#id").val();
let chore = $("#chore").val();
async function erase(id) {
  try {
    await axios.delete("/" + id);
    location.reload();
  } catch (error) {
    console.log(error.message);
  }
}

async function edit(id, chore) {
  try {
    await axios.put("/" + id, { chore });
    location.reload();
  } catch (error) {
    console.log(error.message);
  }
}
