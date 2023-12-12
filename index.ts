const Koa = require('koa')
const Router = require('koa-router')
const parser = require('koa-bodyparser')
const Employeee = require('./models/employee')
const Managerr = require('./models/manager')

const app = new Koa();
const router = new Router();

app.use(parser())


app.use(async (ctx:any, next: () => any) => {
  try {
    await next();
  } catch (error:any) {
    ctx.body = { error: error.message };
  }
});

router.get('/', (ctx:any)=>{
  ctx.body = "hello";
})

//Manager

router.get('/manager', async (ctx: { body: any; }) => {
  const manager = await Managerr.find();
  ctx.body = manager;
});

router.post('/manager', async (ctx:any) => {
  const { name } = ctx.request.body;
  const newManager = new Managerr({ name});
  await newManager.save();
  ctx.body = newManager;
});

//Employee

router.get('/employees', async (ctx: { body: any; }) => {
  const employees = await Employeee.find();
  ctx.body = employees;
});


router.get('/employees/:id', async (ctx: { params: { id: any; }; status: number; body: { error: string; }; }) => {
  const employee = await Employeee.findById(ctx.params.id);
  if (!employee) {
    ctx.status = 404;
    ctx.body = { error: 'Employee not found' };
  } else {
    ctx.body = employee;
  }
});

router.post('/employees', async (ctx:any) => {
  let { name, empID, dob, gender, salary, manager } = ctx.request.body;
  let mngr = await Managerr.findOne({name:"Shyam"});
  manager = mngr._id 
  
  const newEmployee = new Employeee({ name, empID, dob, gender, salary, manager });
  await newEmployee.save();
  ctx.body = newEmployee;
});


router.put('/employees/:id', async (ctx:any) => {
    try {
      const updatedEmployee = await Employeee.findByIdAndUpdate(ctx.params.id, ctx.request.body, { new: true });
      if (!updatedEmployee) {
        ctx.status = 404;
        ctx.body = { error: 'Employee not found' };
      } else {
        ctx.body = updatedEmployee;
      }
    } catch (error:any) {
      ctx.status = 400;
      ctx.body = { error: error.message };
    }
  });
  
  router.del('/employees/:id', async (ctx: { params: { id: any; }; status: number; body: { error?: any; message?: string; }; }) => {
    try {
      const deletedEmployee = await Employeee.findByIdAndRemove(ctx.params.id);
      if (!deletedEmployee) {
        ctx.status = 404;
        ctx.body = { error: 'Employee not found' };
      } else {
        ctx.body = { message: 'Employee deleted successfully' };
      }
    } catch (error:any) {
      ctx.status = 400;
      ctx.body = { error: error.message };
    }
  });

app.use(router.routes());
app.use(router.allowedMethods());

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
