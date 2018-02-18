#[derive(Serialize, Deserialize)]
pub struct Day  {
    // pub id: i64,
    // pub created_at: String,
    // pub updated_at: String,
    pub date: String,
    pub tasks: Vec<super::task::Task>
}