class Home {
    get placeTextBox() { return $(`[data-testid="bigsearch-query-attached-query"]`)}

    enterPlace() {
        this.placeTextBox.setValue("Eindhoven")
    }
}

module.exports = new Home()