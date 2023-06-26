# How to Contribute

We'd love to accept your patches and contributions to this project. There are several ways to do that.

## Submitting code via Pull Requests

*Thank you* for considering submitting code to the Online library!

- We follow the [GitHub Pull Request Model](https://help.github.com/articles/about-pull-requests/) for
  all contributions.
- For large bodies of work, we recommend creating an
  "[issue](https://github.com/perisicnikola37/nodejs-mongo-api/issues)"
  outlining the feature that you wish to build, and describing how it will be implemented. This gives a chance
  for review to happen early and ensures no wasted effort occurs.
- For new README languages, documentation *must* be included with adding country flags on other README pages.
- You can make API documentation(Postman, Swagger) in another language and ensure to change README links to them.
- All submissions, including submissions by project members, will require review before being merged.
- Once a review has occurred, please rebase your PR down to a single commit. This will ensure a nice clean Git history.
- If you are unable to access build errors from your PR, make sure to contact us.
- Please follow the code formatting instructions below.

### Notes

When submitting your contributions, please adhere to the following guidelines:
- Follow the Node.js code style and conventions.
- Follow the API design conventions and best practices for writing API code.
- Remove trailing whitespace from files before submitting pull requests.
- Ensure your changes follow the project structure to maintain consistency.

#### Coding and Development

- [How to write a good Git Commit message](https://chris.beams.io/posts/git-commit/) -
  Great way to make sure your Pull Requests get accepted.
- **Log levels usage:**
  - Fatal - a critical error has happened and the application can not perform subsequent work anymore. Examples: missing configuration information in case there are no default values provided, one of the services can not start normally, etc.
  - Error - a serious issue has happened, users are affected without having a way to work around one, but an application may continue to work. This error usually requires someone’s attention. Examples: a file cannot be opened, cannot respond to HTTP requests properly, etc.
  - Warn - something bad has happened, but the application still has the chance to heal itself or the issue can wait for some time to be fixed. Example: a system has failed to connect to an external resource but will try again automatically.
  - Info - should be used to document state changes in the application or some entity within the application. These logs provide the skeleton of what has happened. Examples: system started/stopped, remote API calls, a new user has been created/updated, etc.
  - Debug - diagnostic information goes here and everything that can help to troubleshoot an application. Examples: any values in business logic, detailed information about the data flow.

  More details can be found in [this article](https://medium.com/@tom.hombergs/tip-use-logging-levels-consistently-913b7b8e9782).
