exports.seed = (knex, Promise) => {
  return knex('ideal').del()
    .then( () => {
      return knex('ideal').insert([
        {user_id: knex('user').where('user.email','faisonusmc@gmail.com').select('user.id'), location_id: knex('location').where('location.name','Royal Arch Trail').select('location.id'), temp_min: 75, temp_max: 95, wind_max: 10, percip_max: 10},
        {user_id: knex('user').where('user.email','torrepaul@gmail.com').select('user.id'), location_id: knex('location').where('location.name','Chautauqua').select('location.id'), temp_min: 70, temp_max: 85, wind_max: 15, percip_max: 8},
        {user_id: knex('user').where('user.email','louisemail@gmail.com').select('user.id'), location_id: knex('location').where('location.name','Red Rocks Run').select('location.id'), temp_min: 80, temp_max: 105, wind_max: 5, percip_max: 6},
        {user_id: knex('user').where('user.email','steveemail@gmail.com').select('user.id'), location_id: knex('location').where('location.name','Nederland Hike').select('location.id'), temp_min: 65, temp_max: 90, wind_max: 10, percip_max: 15}
      ])
    })
}