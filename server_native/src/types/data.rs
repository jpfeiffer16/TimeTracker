#[derive(Deserialize)]
pub struct Data<T> {
    pub db: String,
    pub params: T
}