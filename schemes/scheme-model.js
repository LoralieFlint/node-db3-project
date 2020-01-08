const db = require("../data/db-config")

function find() {
    return db("schemes")
}

function findById(id) {
    return db("schemes")
    .where({ id })
    .first()
}

function findSteps(id) {
    return db("schemes as sc")
    .join("steps as st", "sc.id", "st.scheme_id")
    .where({scheme_id: id})
    .select("st.id", "sc.scheme_name", "st.step_number", "st.instructions")
}

async function add(scheme) {
   const [id] = await db("schemes").insert(scheme)
   return db("schemes").where({ id }).first()
}
function update(changes, id){
    return db("schemes").where({ id }).update(changes) .then((res) => {
        return findById(id)
    })
 }

function remove(id) {
    return db('schemes').where({ id }).del();
}

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove,
    addStep,
}

function addStep(step, id) {
    const stepData = { scheme_id: id, ...step }
    
    return db('steps')
    .insert(stepData)
    .then(id => ({
      ...stepData, id: id[0]
    }))
  }