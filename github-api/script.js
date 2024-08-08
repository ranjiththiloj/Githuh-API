var form = document.getElementById("myForm");

form.addEventListener('submit', function(e) {
    e.preventDefault();

    var search = document.getElementById("search").value;

    var orgname = search.split(' ').join('');

    document.getElementById("result").innerHTML = "";

    fetch("https://api.github.com/users/" + orgname + "/repos")
    .then((result) => result.json())
    .then((data) => {
        console.log(data);

        if (data.length === 0) {
            document.getElementById("result").innerHTML = "No repositories found.";
            return;
        }

        var reposHTML = '<ul>';
        data.forEach((repo) => {
            reposHTML += `
                <li>
                    <a target="_blank" href="${repo.html_url}">
                        ${repo.name}
                    </a>
                </li>
            `;
        });
        reposHTML += '</ul>';

        document.getElementById("result").innerHTML = reposHTML;
    })
    .catch((error) => {
        console.error('Error:', error);
        document.getElementById("result").innerHTML = "An error occurred. Please try again.";
    });
});
