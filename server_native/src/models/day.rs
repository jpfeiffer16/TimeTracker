#[derive(Serialize, Deserialize)]
#[derive(Debug)]
#[serde(rename_all = "camelCase")]
pub struct Day  {
    pub id: Option<i64>,
    pub date: Option<String>,
    pub created_at: Option<String>,
    pub updated_at: Option<String>,
    pub tasks: Vec<super::task::Task>
}