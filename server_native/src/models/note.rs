#[derive(Serialize,Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Note {
  pub id: Option<i64>,
  pub title: Option<String>,
  pub text: Option<String>,
  pub created_at: Option<String>,
  pub updated_at: Option<String>
}