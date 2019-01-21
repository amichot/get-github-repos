function displayResults(responseJson) {

}

function getRepos(handle) {
  const url = `https://api.github.com/users/${handle}/repos`;

	fetch(url)
		.then(response => {
			if (response.ok) {
				return response.json();
			}
			throw new Error(response.statusText);
		})
		.then(responseJson => console.log(responseJson))
		.catch(err => {
			$("js-error-message").text(`Something went wrong: ${err.message}`);
		});
}

function watchForm() {
  console.log("watchForm is Running")
	$("js-form").on("submit", event => {
		event.preventDefault();
		const userInput = $("js-github-handle").val();
		getRepos(userInput);
	});
}

watchForm()
