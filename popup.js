document.addEventListener("DOMContentLoaded", async () => {
  const uploadBtn = document.getElementById("uploadBtn");
  const message = document.getElementById("message");
  const randomCheck = document.getElementById("randomCheck");
  const manualFields = document.getElementById("manualFields");

  const countInput = document.getElementById("count");
  const titleInput = document.getElementById("title");
  const priceInput = document.getElementById("price");
  const levelInput = document.getElementById("level");
  const serverInput = document.getElementById("server");

  // Enable/disable manual fields
  function toggleManualFields(enabled) {
    const manualInputs = manualFields.querySelectorAll("input, select");
    manualInputs.forEach((el) => {
      el.disabled = !enabled;
      if (enabled) {
        el.setAttribute("required", "required");
      } else {
        el.removeAttribute("required");
      }
    });
  }

  randomCheck.addEventListener("change", () => {
    toggleManualFields(!randomCheck.checked);
  });

  toggleManualFields(!randomCheck.checked); // Initial state

  // Check current tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!tab.url.includes("g2g.com")) {
    message.textContent = "Opening G2G in a new tab...";
    await chrome.tabs.create({ url: "https://www.g2g.com" });
    return;
  }

  // Get token
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      func: () => localStorage.getItem("accessToken"),
    },
    async ([result]) => {
      const token = result.result;
      if (!token) {
        message.textContent = "Please log in to G2G.";
        return;
      }

      message.textContent = "Ready to upload.";
      uploadBtn.style.display = "inline-block";

      // Extract seller_id from refresh_token
      const refreshToken = await getCookie("refresh_token");
      if (!refreshToken) {
        message.textContent = "No refresh_token found in cookies.";
        return;
      }
      const sellerId = refreshToken.split(".")[0]; // Noktadan önceki kısmı alıyoruz

      uploadBtn.onclick = async () => {
        const numAccounts = parseInt(countInput.value, 10);
        for (let i = 0; i < numAccounts; i++) {
          let level, skins, champs, title, unit_price, server;

          if (randomCheck.checked) {
            level = getRandom(30, 120);
            skins = getRandom(1, 20);
            champs = getRandom(20, 80);
            title = `EUW | Level ${level} | ${skins} Skins | ${champs} Champions | handLeveL - Email & Username Changeable | Instant Delivery`;
            unit_price = calculatePrice(level, champs, skins);
            skins = getSkinsDatasetId(skins);
            champs = getChampionsDatasetId(champs);
            server = getRandomServer();
          } else {
            title = titleInput.value;
            unit_price = parseFloat(priceInput.value);
            level = parseInt(levelInput.value);
            server = serverInput.value;
            skins = "ce97df6f";
            champs = "191cd6d7";
          }

          const offerData = {
            seller_id: sellerId,
            delivery_method_ids: [],
            delivery_speed: "manual",
            delivery_speed_details: [{ min: 1, max: 1, delivery_time: 10 }],
            qty: 1,
            description: `.For All Inquiries, Please Contact Us via G2G Chat.\nAccount Features:\nFull access guaranteed\nEmail and username changeable\nInstant and secure delivery\nAffordable and 100% safe\nHandmade and self-played account (no bots or third-party software)\n\n| Discounts available for multiple account purchases\n| Looking for a custom or rare account?\nSimply contact us — we will assist you in finding the perfect match`,
            currency: "USD",
            min_qty: 1,
            low_stock_alert_qty: 0,
            sales_territory_settings: {
              settings_type: "global",
              countries: [],
            },
            title: title,
            offer_attributes: [
              { collection_id: "e80c30d1", dataset_id: server }, // Server Selector
              { collection_id: "319340f0", dataset_id: "65ec9642" }, // Account Type Selector
              { collection_id: "eb7040e2", dataset_id: "dc514fdf" }, // Rank Selector
              { collection_id: "04862150", dataset_id: champs }, // Champ Selector
              { collection_id: "962f619a", dataset_id: skins }, // Skin Selector
            ],
            external_images_mapping: [],
            unit_price,
            other_pricing: [],
            wholesale_details: [],
            other_wholesale_details: [],
            service_id: "f6a1aba5-473a-4044-836a-8968bbab16d7",
            brand_id: "lgc_game_22666",
            offer_type: "public",
          };

          try {
            const res = await fetch("https://sls.g2g.com/offer", {
              method: "POST",
              headers: {
                Authorization: token,
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify(offerData),
            });

            const data = await res.json();
            console.log("Offer created:", data);
            message.textContent = `Offer #${i + 1} uploaded successfully.`;
          } catch (err) {
            console.error(err);
            message.textContent = `Error uploading offer #${i + 1}`;
          }
        }
      };
    }
  );
});

// Utility functions
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function calculatePrice(level, champions, skins) {
  const base = 3;
  const factor =
    (level / 120) * 2 + (champions / 80) * 1.5 + (skins / 20) * 1.5;
  const price = base + factor;
  return Math.max(3, Math.min(7, Math.round(price * 100) / 100));
}

function getChampionsDatasetId(champs) {
  const options = [
    { min: 160, dataset_id: "3ee17abb" },
    { min: 130, dataset_id: "dc9b65bb" },
    { min: 100, dataset_id: "2ea03f75" },
    { min: 50, dataset_id: "7bbf537c" },
    { min: 30, dataset_id: "191cd6d7" },
    { min: 10, dataset_id: "b03ce3d1" },
    { min: 0, dataset_id: "b5d60c4b" }, // 9 or below
  ];

  for (let opt of options) {
    if (champs >= opt.min) {
      return opt.dataset_id;
    }
  }

  // fallback (should never hit)
  return null;
}

function getSkinsDatasetId(skins) {
  const options = [
    { min: 1000, dataset_id: "da83ec6e" },
    { min: 500, dataset_id: "32895a53" },
    { min: 300, dataset_id: "bbe13228" },
    { min: 100, dataset_id: "70f8019b" },
    { min: 50, dataset_id: "c1721794" },
    { min: 10, dataset_id: "4be5718c" },
    { min: 0, dataset_id: "ce97df6f" }, // 9 or below
  ];

  for (let opt of options) {
    if (skins >= opt.min) {
      return opt.dataset_id;
    }
  }

  // fallback (should not occur)
  return null;
}

function getRandomServer() {
  const servers = [
    { value: "304244a1", label: "EUW" },
    { value: "1a87dd85", label: "EUNE" },
    { value: "e2f2c55b", label: "NA" },
  ];

  // Random server seç
  const randomIndex = Math.floor(Math.random() * servers.length);
  return servers[randomIndex].value;
}

async function getCookie(name) {
  // chrome.cookies.getAll() fonksiyonu callback ile çalışır, bu yüzden bir Promise ile sarmalıyoruz
  return new Promise((resolve, reject) => {
    chrome.cookies.getAll({ domain: "www.g2g.com" }, (cookies) => {
      const cookie = cookies.find((cookie) => cookie.name === name);
      if (cookie) {
        resolve(cookie.value);
      } else {
        reject("test");
        reject(`Cookie with name "${name}" not found`);
      }
    });
  });
}
