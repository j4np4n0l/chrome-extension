// popup.js

// Function to update the UI with SEO metadata
function updateUI(response) {
	const seoContainer = document.getElementById("container");

	if (response && response.seoMetadata) {

		if (response.seoMetadata.pkw != "No main keyword found") {
			primaryKeyword = `<div class="result"><strong>Main Keyword 
			<span style="font-weight:normal; text-transform:none;">(Login required to display)</span></strong>
			${response.seoMetadata.pkw}</div>`;
		} else { 
			primaryKeyword = '';
		}

		if (response.seoMetadata.keywords != "No keywords found") {
			keywords = `<div class="result"><strong>Keywords</strong>
			${response.seoMetadata.keywords}</div>`;
		} else { 
			keywords = '';
		}

		if (response.seoMetadata.social != "No social tagline added") {
			socialTagline = `<div class="result"><strong>Social Tagline</strong>
			${response.seoMetadata.social}</div>`;
		} else { 
			socialTagline = '';
		}

		if (response.seoMetadata.category != "No category detected") {
			categoryName = `<div class="result"><strong>Category</strong>
			${response.seoMetadata.category}</div>`;
		} else { 
			console.log(response.seoMetadata.category);
			categoryName = '';
		}

		if (response.seoMetadata.tags != "No tags detected") {
			tagList = `<div class="result"><strong>Tags</strong>
			${response.seoMetadata.tags}</div>`;
		} else { 
			console.log(response.seoMetadata.tags);
			tagList = '';
		}

		seoContainer.innerHTML = `
		<div class="result">
			<strong>Title Tag</strong>
			${response.seoMetadata.title}
		</div>

		<div class="result">
			<strong>Meta Description</strong>
			${response.seoMetadata.description}
		</div>

		${primaryKeyword}

		${keywords}

		<div class="result">
			<strong>H1</strong>
			${response.seoMetadata.h1}
		</div>

		<div class="result">
			<strong>URL</strong>
			${response.seoMetadata.url}
		</div>

		${socialTagline}

		${categoryName}

		${tagList}
		
		`;
	} else {
		seoContainer.innerHTML = "<span style='color: #ffffff'>Error fetching SEO information. Please refresh the page.</span>";
	}
}

// Request SEO metadata from content script
chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, { action: "getSEO" }, function(response) {
    updateUI(response);
  });
});
