$(document).ready(function(){
	
	// управление sidebar'ом
	$(".sidebar__minify").click(function(){
		$(this).closest(".main").toggleClass("sidebar__mini");
	});
	
	// кнопка в dashboard
	$(".dashboard__story-item__menu-button").click(function(){
		$(this).closest(".dashboard__story-item__menu").toggleClass("active");
	});
	$(".dashboard__tasks-tabs__body-list__item-menu__button").click(function(){
		$(this).closest(".dashboard__tasks-tabs__body-list__item-menu").toggleClass("active");
	});
	
	// табы
	$(".tabs__head-item").click(function(){
		$(this).closest(".tabs").find(".tabs__body-item.active").removeClass("active");
		$(this).closest(".tabs").find(".tabs__head-item.active").removeClass("active");
		$(this).addClass("active");
		$(this).closest(".tabs").find(".tabs__body-item").eq($(this).index()).addClass("active");
	});
	
	// выпадающий список
	$(".dropdown__current").click(function(){
		$(this).closest(".dropdown").toggleClass("opened");
	});
	$(".dropdown__item").click(function(){
		var	parentDropdown = $(this).closest(".dropdown"),
			indexEl = $(this).index(),
			currentText = $(this).text(),
			currentEl = parentDropdown.find(".dropdown__current"),
			selectForm = parentDropdown.find("select"),
			selectFormOption = selectForm.find("option").eq(indexEl).attr("value");
		selectForm.find("option").removeAttr("selected");
		selectForm.find("option").eq(indexEl).attr("selected","selected");
		selectForm.val(selectFormOption);
		currentEl.text(currentText);
		parentDropdown.removeClass("opened");
	});
	
});