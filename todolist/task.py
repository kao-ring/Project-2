class Tasks():

    count = 1

    def __init__(self, category, tasks):
        self.category = category
        self.tasks = tasks
        self.id = Tasks.count
        Tasks.count += 1