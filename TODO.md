- [x] Create data for backend
- [x] Populate the backend with the data (local)
- [x] Return data from a sample query
- [x] Figure out how to return a list of words that were not found
- [x] Reject input of over 1000 words
- [x] Make the route POST and start testing from Postman
- [x] Protect dangerous routes with private key
- [x] Put data in the real (online) DB
- [x] Fix the 'setting mixed' message on server launch
- [x] Create new backend data with JLPT data
  - [x] both the value and displayvalue!
- [x] Update backend data to include JLPT data
  - [x] model
  - [x] schema
- [x] Make a request from the frontend and get a successful response
- [x] Compare UI Component Libraries
  - [x] Mantine - maybe next project, looks interesting
  - [x] MUI - use this for now
  - [x] Ant Design - no. don't see any advantages over MUI.
  - [x] Rebass - no. bad docs
  - [x] Chakra - no. most showcase projects look bad
  - [x] Tamagui - no. too new, ridiculous whitespace by default
- [x] Create super basic frontend
  - [x] TextArea to input words
  - [x] Button to send them off
  - [x] Sliders to control FL priority (no full defaults for now, build that later)
  - [x] div that the response gets rendered into
- [x] figure out how to clean up front-end input so we get a clean request
  - [x] strip anything inside of () or （）
  - [x] then do a regex to turn all space, newline, 「,」「、」 into a single space
  - [x] then split by ' ', make sure there are no empty elements, JSONify, send off
- [x] Cards in frontend
- [x] Design the ranking algorithm (in frontend?)
  - (1/rankA) + (1/rankB) etc for all rankings that exist
- [x] Make ResponseItem (or something like that) component
  - [x] The word
  - [x] The definition
  - [x] Rank in Frequency Lists
  - [x] Links to...
    - [x] Jisho
    - [x] ImmersionKit
    - [x] YouGlish
- [x] Save slider settings in LocalStorage?
- [x] Make sure I'm not using a Chinese font in the frontend
- [x] Create nice frontend
  - [x] Figure out better Search button
  - [x] Figure out better back button (in app bar?)
  - [x] Don't show frequency lists on Results page?
  - [x] Better item spacing on results page
  - [x] Filter dropdown should open in a nice location (or just make it modal?)
  - [x] Filter dropdown should have nice padding
- [x] Install Helmet
- [x] Style help menu
  - [x] slightly rounded?
  - [x] not such a high contrast border?
- [x] Add favicon and don't call it 'React App'
- [x] Maybe make the FL weighting a bit less... try 1/sqrt(FL)?
- [x] Use React Router so we have URLs (/ and /search)
- [x] Implement correct browser back button behaviour
- [x] REGEX: It should correctly process "軟弱（note）·魔術（note）·呪術 （note）"
- [x] Add key prop to sliders and result renders
- [x] Create help menu content
  - [x] Add a button that creates sample data
- [x] Validate schema on /api/learnorder
- [x] Front end error handling if we get a bad server response
- [x] Frontend: flash some kind of message if we get >1 not found words, but 0 found words
- [x] Weighting: set negative numbers to 0
- [x] Write API tests (Jest)
- [x] Help menu shouldn't be able to create default input when we're already in results
  - [x] Do we need the help menu there at all? Or is something else maybe better?
- [x] Figure out how to DRY - model, schema, interface, front/backend,...
  - [x] What's the smallest number of places I can define what my data looks like?
  - [x] Use Types instead of interfaces, and infer them from Zod schema
    - [*] https://github.com/colinhacks/zod/issues/53#issuecomment-738110750
    - [x] Currently not using the CreateWordInput / SearchWordsInput types ... USE THEM
- [x] Write Front End tests (React Testing)

- [x] Redesign
  - [x] Generate an awesome theme
    - [x] Find a color palette: https://lospec.com/palette-list
    - [x] Another reference: https://www.awwwards.com/trendy-web-color-palettes-and-material-design-color-schemes-tools.html ('ENID')
      - [*] #607262, #f4e3d1, #faf9f4
    - [x] Test it: https://cimdalli.github.io/mui-theme-generator/
    - [x] MyColor.space
  - [x] Fonts
    - [x] Header: Garamond? https://fonts.google.com/specimen/EB+Garamond?preview.text=botanical%20beauty&preview.text_type=custom
      - [x] See if I can make it more narrow like on ENID https://enid.fm/case-studies/rowse-beauty
        - [x] font-stretch css property?
    - [x] Other European text: Poppins 400? https://fonts.google.com/specimen/Poppins or lighter weight?
    - [x] Buttons: Archivo 700 all-caps, bit more spacing? https://fonts.google.com/specimen/Archivo
- [x] Deploy
  - [x] Server: Heroku
  - [x] Client: Github Pages
    - [x] ENV variables (2nd answer): https://stackoverflow.com/questions/53648652/how-to-use-environment-variables-in-github-page
- [x] FIX: JLPT arrays didn't populate properly in production DB
- [x] Implement HashRouter so 
- [x] Text on contrast buttons is too yellow
  - [x] Try: Same off-white as textarea input
- [x] Write Readme
  - [x] Screenshot
  - [x] Tech stack:
    - Frontend: React + TypeScript, React Router, Zustand, Material UI, (React Testing Library)
    - Backend: Node + TypeScript, Mongoose + Typegoose, Zod, Jest/Supertest
    - DB: MongoDB on Atlas, about 200k documents of data I parsed myself
  - [x] Show off cool stuff that I did
  - [x] Say what I'm proud of
    - [x] "real" API: TypeScript, TypeGoose, Zod
      - [x] propery api structure / folder layout
      - [x] Schema validation on API request
      - [x] backend test suite uising supertest, frontend test suite using react testing library
  - [x] Give thanks to stuff I used
    - [x] JLPT Frequency List: https://github.com/stephenmk/yomichan-jlpt-vocab
- [x] Add "done" button to each card to remove it from the list
- [x] Add a button to the bottom (or hovering?) to add revised word list to clipboard

## Bugs
  - [ ] Modal behaves weirdly at small screen heights

## Possible future additions
  - [ ] Styling
    - [ ] checkmark button is spaced weirdly relative to bottom right button
    - [ ] Add shrink animation when an item is marked done
    - [x] Always keep NavBar on screen
  - [ ] Filter results by JLPT
    - [*] but... could only work for EITHER exact matches, or match every reading all the time, and neither seems ideal. JLPT lists map somewhat closely to frequency lists so maybe this isn't so important.
  - [ ] Deinflection
    - [*] Could just use Yomichan code (check what license they're using!)
  - [ ] In some edge cases words have duplicate JLPT entries - fix this
    - [ ] The edge case where this seems to appear is words with two different unconventional readings, which both point back to the JLPT level of the common reading - for example 明後日 has "N5 (あさって), N5 (あさって), N3, N1"
    - [ ] This could probably just be fixed in the backend to avoid having to recreate the entire dataset - but fixing it in the backend would be cleaner
    - [ ] check: 明後日 should have 3, not 4 entries

## Refactoring
  - [ ] Turn removeWord and removeNotFound into one function by using good typescript
  - [ ] Make WordCard and WordCardMini into one component that either takes a variable to know which one it is, or decides itself based on props