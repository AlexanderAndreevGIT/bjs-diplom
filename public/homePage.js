"use strict"

const logoutButton = new LogoutButton();

logoutButton.action = () => ApiConnector.logout(response => {
	if (response.success) {
		location.reload();
	}
});

ApiConnector.current(response => {
	if (response.success) {
		ProfileWidget.showProfile(response.data);
	}
});

const ratesBoard = new RatesBoard();

const ratesBoardUpdate = () => ApiConnector.getStocks(response => {
	if (response.success) {
		ratesBoard.clearTable();
		ratesBoard.fillTable(response.data);
	}
});

ratesBoardUpdate();
setInterval(() => ratesBoardUpdate(), 60000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => ApiConnector.addMoney(data, response => {
	if (response.success) {
		ProfileWidget.showProfile(response.data);
		moneyManager.setMessage(response.success, 'Операция выполнена успешно');
	} else {
		moneyManager.setMessage(response.success, response.error)
	}
});

moneyManager.conversionMoneyCallback = (data) => ApiConnector.convertMoney(data, response => {
	if (response.success) {
		ProfileWidget.showProfile(response.data);
		moneyManager.setMessage(response.success, 'Операция выполнена успешно');
	} else {
		moneyManager.setMessage(response.success, response.error);
	}
});

moneyManager.sendMoneyCallback = (data) => ApiConnector.transferMoney(data, response => {
	if (response.success) {
		ProfileWidget.showProfile(response.data);
		moneyManager.setMessage(response.success, 'Операция выполнена успешно');
	} else {
		moneyManager.setMessage(response.success, response.error);
	}	
});

const favorites = new FavoritesWidget();

ApiConnector.getFavorites(response => {
	if (response.success) {
		favorites.clearTable();
		favorites.fillTable(response.data);
		moneyManager.updateUsersList(response.data);
	}
});

favorites.addUserCallback = (data) => ApiConnector.addUserToFavorites(data, response => {
	if (response.success) {
		favorites.clearTable();
		favorites.fillTable(response.data);
		moneyManager.updateUsersList(response.data);
		favorites.setMessage(response.success, 'Пользователь добавлен');
	} else {
		favorites.setMessage(response.success, response.error);
	}
});

favorites.removeUserCallback = (data) => ApiConnector.removeUserFromFavorites(data, response => {
	if (response.success) {
		favorites.clearTable();
		favorites.fillTable(response.data);
		moneyManager.updateUsersList(response.data);
		favorites.setMessage(response.success, 'Пользователь удален');
	} else {
		favorites.setMessage(response.success, response.error);
	}
});






