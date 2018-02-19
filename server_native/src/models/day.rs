#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Day  {
    pub id: i64,
    pub date: String,
    pub created_at: String,
    pub updated_at: String,
    pub tasks: Vec<super::task::Task>
}