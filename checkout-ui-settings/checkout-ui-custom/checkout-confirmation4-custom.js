// WARNING: THE USAGE OF CUSTOM SCRIPTS IS NOT SUPPORTED. VTEX IS NOT LIABLE FOR ANY DAMAGES THIS MAY CAUSE. THIS MAY BREAK YOUR STORE AND STOP SALES. IN CASE OF ERRORS, PLEASE DELETE THE CONTENT OF THIS SCRIPT.


const isGiftcard = (item) => {
  const categoryValues = Object.values(item.additionalInfo.categories).map(
      (categoryObject) => categoryObject.name
  );
  return categoryValues.includes('ohgiftcard');
};

const isPureGiftcardCart = (items) => {
  if (!items || !items.length) return false;

  for (const item of items) {
      if (!isGiftcard(item)) return false;
  }
  return true;
};

const getOrderById = (orderId) => {
  return new Promise((resolve, reject) => {
      fetch(`/api/oms/pvt/orders/${orderId}`)
          .then((data) => data.json())
          .then(resolve)
          .catch(reject);
  });
};

const getOrderId = () => {
  const elem = document.getElementById('order-id');
  if (!elem) return;
  const orderId = elem.textContent.split('#')[1];
  return orderId;
};

const hideHtmlElement = (element) => {
  if (element) {
      element.style.display = 'none';
      element.classList.add('hiddenByScript');
  }
};

const hideElementById = (id) => hideHtmlElement(document.getElementById(id));

const hideElementsByClassName = (className) => {
  const arrayOfElements = document.getElementsByClassName(className);
  for (const element of arrayOfElements) hideHtmlElement(element);
};

const hideAllShippingInfo = () => {
  const container = document.querySelector('.address-summary').parentElement.parentElement.parentElement;
  hideHtmlElement(container);
  hideElementsByClassName('bg-light-gray ph3');
};

const hideNecessaryInformation = async () => {
  const orderId = getOrderId();
  if (!orderId) return;
  const { items } = await getOrderById(orderId);
  if (isPureGiftcardCart(items)) hideAllShippingInfo();
};

const defer = (method) => {
  const elem = document.getElementById('order-id');
  if (elem) return method();

  setTimeout(() => {
      defer(method);
  }, 500);
};

document.addEventListener('DOMContentLoaded', () => defer(hideNecessaryInformation));
