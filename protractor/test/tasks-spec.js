/* Test script for the Tasks List app */
describe('the tasks app', function() {
    var taskTitleInp = element(by.model('newTask.title')); // find the ng model for it
    var addTaskBtn = element(by.buttonText('Add Task'));
    var tasksList = element.all(by.repeater('task in tasks'));
    var requiredMsg = $('.title-required-error');

    function addTask(title) {
        taskTitleInp.sendKeys(title);
        addTaskBtn.click();
    }

    function addMultipleTasks(num) {
        var idx;
        for (idx = 0; idx < num; ++idx) {
            addTask('Task ' + idx);
        }
    }

    beforeEach(function() { // run this function before each test
        browser.get('http://localhost:8000/'); //maybe add a slash at end if not work
    });

    //afterEach() is also a protracjor function

    it('must have the proper page title', function() {
        expect(browser.getTitle()).toEqual('My Tasks');
    });

    // every test case use it function
    it('must add a task', function() {
        var title = 'Learn Protractor';
        addTask(title);
        expect(tasksList.count()).toEqual(1);
        expect(tasksList.get(0).getText()).toEqual(title);
    });

    it('must add a task hitting enter', function() {
        var title = 'Learn Protractor';
        taskTitleInp.sendKeys(title);

        taskTitleInp.sendKeys(protractor.Key.ENTER); //sending the enter key

        expect(tasksList.count()).toEqual(1);
        expect(tasksList.get(0).getText()).toEqual(title);
    });

    it('must clear the title after adding', function() {
        addTask('box should get cleared');
        expect(taskTitleInp.getAttribute('value')).toEqual('');
    });

    it('must add multiple tasks', function() {
        addMultipleTasks(5);
        expect(tasksList.count()).toEqual(5);
    });

    it('must show required validation error', function() {
        expect(requiredMsg.isPresent()).toEqual(false); //isPresent gets boolean
        taskTitleInp.sendKeys('abc');
        taskTitleInp.clear(); //clear method to clear input
        expect(requiredMsg.isPresent()).toEqual(true);
        taskTitleInp.sendKeys('abc');
        expect(requiredMsg.isPresent()).toEqual(false);
    });

    it('must disable add task button with blank title', function() {
        expect(addTaskBtn.getAttribute('disabled')).toEqual('true'); //weird syntax idk
        taskTitleInp.sendKeys('abc');
        expect(addTaskBtn.getAttribute('disabled')).toBe(null);
        taskTitleInp.clear();
        taskTitleInp.sendKeys('          ');
        expect(addTaskBtn.getAttribute('disabled')).toEqual('true');
    });

    it('must toggle done with click', function() {
        addTask('test style class');
        addTask('not marked as done');
        expect(tasksList.count()).toEqual(2);
        tasksList.get(0).click();
        expect(tasksList.get(0).getAttribute('class'))
            .toContain('completed-task'); // why use contain, because other style class
        expect(tasksList.get(1).getAttribute('class')).not.toContain('completed-task');
    });

    it('must purge completed tasks', function() {
        addTask('Task 1');
        addTask('Task 2');
        expect(tasksList.count()).toEqual(2);
        tasksList.get(0).click();
        element(by.buttonText('Purge Completed Tasks')).click();
        expect(tasksList.count()).toEqual(1);
        expect(tasksList.get(0).getText()).toEqual('Task 2');
    });
});