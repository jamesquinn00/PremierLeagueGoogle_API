const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../static/index.html'), 'utf8');


describe('index.html', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    })

    describe('head', () => {
        test('has a title', () => {
            const title = document.querySelector('head title');
            expect(title).toBeTruthy();
            expect(title.textContent).toBe("Google")
        })
    })

    describe('body', () => {
        describe('button', () => {
            let button;

            beforeEach(() => {
                button = document.querySelector('#searchbutton')
            })

            test('it exists', () => {
                expect(button).toBeTruthy();
            })

            test('it does something', () => {
                expect(button.textContent.toLowerCase()).toContain('submit')
            })

        })

        describe('form', () => {
            let form;
            let searchbar;
            let searchbutton;
            beforeEach(() => {
                form = document.querySelector('form')
                searchbar = document.querySelector('#searchbar')
                searchbutton = document.querySelector('#searchbutton')
            })
    
            test('it exists', () => {
                expect(form).toBeTruthy();
            });
    
            describe('search', () => {
                test('search input', () => {
                    expect(searchbar).toBeTruthy();
                })

                test('it is a text input"', () => {
                    expect(searchbar.getAttribute('type')).toBe('text')
                })
        
                test('it has a label"', () => {
                    expect(document.querySelector('[for="name"]')).toBeTruthy();
                })
            })

           
        })

        test('it has a section to display results', () => {
            expect(document.querySelector('#results')).toBeTruthy();
        })
    })


})