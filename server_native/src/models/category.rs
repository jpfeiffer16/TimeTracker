#[derive(Serialize,Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Category {
  pub id: Option<i64>,
  pub name: Option<String>
}