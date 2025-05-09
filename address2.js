document.addEventListener("DOMContentLoaded", function () {
  const zipInput = document.querySelector('[name="postal_code2"]'); // 郵便番号
  const addressInput = document.querySelector('[name="address2"]'); // 都道府県・市区町村まで
  const streetInput = document.querySelector('[name="市区町村以降_ご入居者様"]'); // 市区町村以降

  if (zipInput) {
    zipInput.addEventListener("blur", function () {
      const zip = zipInput.value.replace("-", "").trim();
      if (zip.length === 7 && /^[0-9]{7}$/.test(zip)) {
        fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zip}`)
          .then(response => response.json())
          .then(data => {
            if (data.results && data.results.length > 0) {
              const result = data.results[0];
              const address = result.address1 + result.address2; // 都道府県 + 市区町村
              const street = result.address3; // それ以降の町名など

              if (addressInput) addressInput.value = address;
              if (streetInput) streetInput.value = street;
            } else {
              alert("該当する住所が見つかりませんでした。");
            }
          })
          .catch(() => alert("郵便番号検索に失敗しました。"));
      }
    });
  }
});
