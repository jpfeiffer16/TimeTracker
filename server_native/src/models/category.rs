#[derive(Serialize,Deserialize)]
#[derive(Debug)]
#[serde(rename_all = "camelCase")]
pub struct Category {
  pub id: Option<i64>,
  pub name: Option<String>,
  pub created_at: Option<String>,
  pub updated_at: Option<String>
}