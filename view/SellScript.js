const subcategories = {
    "Stationery": ["Pens", "Notebooks", "Drawing Tools", "Folders"],
    "Clothes & Bags": ["T-Shirts", "Jeans", "Backpacks", "Shoes"],
    "Electronics": ["Laptops", "Speakers", "Printers", "Projectors"],
    "Furniture": ["Chairs", "Tables", "Beds", "Cupboards"],
    "Mobile": ["Smartphones", "Chargers", "Covers", "Headphones"],
    "Bikes": ["Bicycles", "Scooters", "Accessories", "Helmets"]
  };
  
  const cards = document.querySelectorAll('.card');
  const subcategoryContainer = document.getElementById('subcategoryContainer');
  const subcategoryTitle = document.getElementById('subcategoryTitle');
  const subcategoryList = document.getElementById('subcategoryList');
  const sellFormContainer = document.getElementById('sellFormContainer');
  const formTitle = document.getElementById('formTitle');
  
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const category = card.getAttribute('data-category');
      const items = subcategories[category] || [];
  
      subcategoryTitle.textContent = `${category} - Subcategories`;
      subcategoryList.innerHTML = items.map(item => `<li data-subcat="${item}">${item}</li>`).join('');
      subcategoryContainer.style.display = 'block';
      sellFormContainer.style.display = 'none'; // hide form on new category
    });
  });
  subcategoryList.addEventListener('click', (e) => {
    if (e.target && e.target.nodeName === "LI") {
        const subcategory = e.target.getAttribute('data-subcat');
        const category = subcategoryTitle.textContent.split(' - ')[0];

        // Redirect to the /sell-form route with query parameters
        window.location.href = `/sell-form?category=${encodeURIComponent(category)}&subcategory=${encodeURIComponent(subcategory)}`;
    }
  });
  
  const form = document.querySelector('form');
const successMessage = document.getElementById('successMessage');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  successMessage.style.display = 'block';
  form.reset();
});

