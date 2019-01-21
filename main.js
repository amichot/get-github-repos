function displayResults(responseJson, handle) {
  $('#js-results-list').empty();
  responseJson.forEach(repo => {
    $("#js-results-list").append(
      `<li><h3><a href=https://github.com/${handle}/${repo.name} target="_blank">${repo.name}</a></h3></li>`
    )
  });
  $('#results').removeClass('hidden');
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
		.then(responseJson => displayResults(responseJson, handle))
		.catch(err => {
			$("js-error-message").text(`Something went wrong: ${err.message}`);
		});
}

function watchForm() {
	$("form").submit(event => {
		event.preventDefault();
		const userInput = $("#js-github-handle").val();
		getRepos(userInput);
	});
}

watchForm()
