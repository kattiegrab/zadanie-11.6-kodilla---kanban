$(document).ready(function(){
	function randomString() { 
		var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ'; 
		var str = ''; 
		for (i = 0; i < 10; i++) { 
				str += chars[Math.floor(Math.random() * chars.length)]; 
			} 
			return str; 
		}
	function Column(name) { 
		var self = this; 
		
		this.id = randomString(); 
		this.name = name; 
		this.$element = createColumn(); 
	
		function createColumn() { 
			// Elementy składowe kolumny
			var $column = $('<div>').addClass('column'); 
			var $columnTitle = $('<h2>').addClass('column-title').text(self.name); 
			var $columnCardList = $('<ul>').addClass('column-card-list'); 
			var $columnDelete = $('<button>').addClass('btn-delete').text('x'); 
			var $columnAddCard = $('<button>').addClass('add-card').text('Dodaj kartę');

			// Zdarzenia
			$columnDelete.click(function() { 
				self.removeColumn(); 
			});
			$columnAddCard.click(function() { 
				self.addCard(new Card(prompt("Wpisz nazwę karty"))); 
			});
		
			// Konstruowanie  elementów kolumny
			$column.append($columnTitle) 
				.append($columnDelete) 
				.append($columnAddCard) 
				.append($columnCardList);
			// Zwracanie stworzonej kolumny 
			return $column;
		}
	}

	Column.prototype = { 
		addCard: function(card) { 
			this.$element.children('ul').append(card.$element); 
		}, 
		removeColumn: function() { 
			this.$element.remove(); 
		} 
	}; 

	function Card(description) { 
		var self = this; 

		this.id = randomString(); 
		this.description = description; 
		this.$element = createCard(); 

		function createCard() { 
			var $card = $('<li>').addClass('card'); 
			var $cardDescription = 
				$('<p>').addClass('card-description').text(self.description); 
			var $cardDelete = $('<button>').addClass('btn-delete').text('x');
		
			$cardDelete.click(function(){ 
				self.removeCard(); 
			});

			$card.append($cardDelete) 
					.append($cardDescription); 
			return $card;
		} 
	}

	Card.prototype = { 
		removeCard: function() { 
			this.$element.remove(); 
		} 
	};

	var board = { 
		name: 'Tablica Kanban', 
		addColumn: function(column) { 
			this.$element.append(column.$element); 
			initSortable();
		}, 
		$element: $('#board .column-container') 
	};
	

	function initSortable() { 
		$('.column-card-list').sortable({ 
			connectWith: '.column-card-list', 
			placeholder: 'card-placeholder' 
		}).disableSelection(); 
	}

	$('.create-column') 
		.click(function(){ 
			var name = prompt('Wpisz nazwę kolumny'); 
			var column = new Column(name); 
			board.addColumn(column); 
		});

	// TWORZENIE KOLUMN 
	var todoColumn = new Column('Do zrobienia'); 
	var doingColumn = new Column('W trakcie'); 
	var doneColumn = new Column('Skończone');
	var toCheckColumn = new Column('Do sprawdzenia'); 

	// DODAWANIE KOLUMN DO TABLICY 
	board.addColumn(todoColumn); 
	board.addColumn(doingColumn); 
	board.addColumn(doneColumn);
	board.addColumn(toCheckColumn); 

	// TWORZENIE NOWYCH EGZEMPLARZY KART 
	var card1 = new Card('Posprzątać :)'); 
	var card2 = new Card('Stworzyć tablice kanban');
	var card3 = new Card('Stworzyć portfolio');
	var card4 = new Card('Wypić kawę');
	var card5 = new Card('Sprawdzić pracę domową K.') 

	// DODAWANIE KART DO KOLUMN 
	todoColumn.addCard(card1); 
	doingColumn.addCard(card2);
	todoColumn.addCard(card3);
	toCheckColumn.addCard(card5);
	doneColumn.addCard(card4);
});