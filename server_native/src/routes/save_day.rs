use rocket_contrib::{Json, Value};
use super::super::models::day::Day;
use super::super::models::task::Task;
use super::super::types::day_body::DayBody;
use super::super::sql;

#[post("/", format = "application/json", data = "<data>")]
pub fn save_day(data: Json<Option<DayBody>>) -> Json<Day> {
  match sql::save_day(data.0.unwrap().params) {
    Ok(id) => Json(sql::get_day(id)),
    Err(_) => Json(Day {
      id: None,
      date: "".to_string(),
      created_at: None,
      updated_at: None,
      tasks: vec!{Task {
        id: None,
        description: "".to_string(),
        time: 0.0,
        created_at: None,
        updated_at: None,
        day_id: None,
        synced: None
      }}
    })
  }
}
