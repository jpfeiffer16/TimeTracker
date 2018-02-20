#[derive(Serialize,Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Category {
  id: i64,
  name: String
}