pub fn get_iso_date(original_str: String) -> String {
    let mut parts = original_str.split(" ");
    format!("{}T{}", parts.nth(0).unwrap(), parts.nth(0).unwrap())
}