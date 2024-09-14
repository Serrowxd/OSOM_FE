# OSOM_FE

Out of sight, out of mind

### Development Notes

Current wants, in no particular order:

- a "today" option that is easy to click, so we can assign a date easily
  - optionally automatic for when the user does not add a date, it should default to today's date.
- "mark as completed" as an option. Either a checkbox that turns the box green, or an option in the edit modal.
- Back-end implementation to store notes and user data.
  - Look into having a local storage version that we make a copy off, minimize cloud usage.
- Connect the API to ChatGPT and create a prompt list for optimizing tasks.
  - This should be an option that the user can select by saying "Tackle the day" or something similar
  - Upon selecting the action, it will generate a return from ChatGPT that will give you a tl;dr on how to attack the list.
  - The user can re-generate this every (5?) minutes, and we will store it on their profile to be shown whenever they login.
  - Add the ability to clear the prompt.