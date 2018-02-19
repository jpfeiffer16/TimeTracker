pub fn get_task(id: i64) -> models::task::Task {
  // let id_string: i64 = row.get(0);
  // println!("{}", &format!("select * from tasks where dayId = {}", id_string));
  let mut task_stmnt = conn.prepare(&format!("select * from tasks where dayId = {}", id_string)).unwrap();
  let task_iter = task_stmnt.query_map(&[], |task_row| {
      models::task::Task {
          id: task_row.get(0),
          description: task_row.get(1),
          time: task_row.get(2),
          created_at: task_row.get(3),
          updated_at: task_row.get(4),
          day_id: task_row.get(5)
          synced: task_row.get(6)
      }
  }).unwrap();
  task_iter.nth(0).unwrap();
  // let mut final_task_vec = Vec::new();
  // for task in task_iter {
  //     final_task_vec.push(task.unwrap());
  // }
}

pub fn get_day() -> 