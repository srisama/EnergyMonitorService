using Autofac;
using Microsoft.Extensions.Configuration;
using EnergyMonitorServices.BusinessDataAccess;
using EnergyMonitorServices.BusinessManager;

namespace EnergyMonitor
{
    public class EnergyMonitorModule:Module
    {
        private IConfiguration configuration;
        public EnergyMonitorModule(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        public IConfiguration Configuration { get => configuration; set => configuration = value; }



        protected override void Load(ContainerBuilder builder)
        {
            base.Load(builder);

            //Register Business Manager for Autofac Dependency Injection
            builder.RegisterType<UserManager>().As<IUserManager>().InstancePerLifetimeScope();
            builder.RegisterType<DevicesManager>().As<IDevicesManager>().InstancePerLifetimeScope();
            builder.RegisterType<EnergyConsumptionManager>().As<IEnergyConsumptionManager>().InstancePerLifetimeScope();
            builder.RegisterType<UserPreferenceManager>().As<IUserPreferenceManager>().InstancePerLifetimeScope();
            builder.RegisterType<EnergyUsageByDeviceManager>().As<IEnergyUsageByDeviceTypeManager>().InstancePerLifetimeScope();
            builder.RegisterType<EnergyUsageByTimeManager>().As<IEnergyUsageByTimeManager>().InstancePerLifetimeScope();
            builder.RegisterType<EnergyUsageSummaryManager>().As<IEnergyUsageSummaryManager>().InstancePerLifetimeScope();



            //Register Data Access for Autofac Dependency Injection
            builder.RegisterType<UserDataAccess>().As<IUserDataAccess>().UsingConstructor(typeof(string))
            .WithParameters(new[] { new NamedParameter("sqlConnection", Configuration.GetConnectionString("SqlConnectionString")), })
            .InstancePerLifetimeScope();

            builder.RegisterType<DevicesAccess>().As<IDevicesAccess>().UsingConstructor(typeof(string))
           .WithParameters(new[] { new NamedParameter("sqlConnection", Configuration.GetConnectionString("SqlConnectionString")), })
           .InstancePerLifetimeScope();

            builder.RegisterType<EnergyConsumptionAccess>().As<IEnergyConsumptionAccess>().UsingConstructor(typeof(string))
          .WithParameters(new[] { new NamedParameter("sqlConnection", Configuration.GetConnectionString("SqlConnectionString")), })
          .InstancePerLifetimeScope();

            builder.RegisterType<UserPreferenceAccess>().As<IUserPreferenceAccess>().UsingConstructor(typeof(string))
          .WithParameters(new[] { new NamedParameter("sqlConnection", Configuration.GetConnectionString("SqlConnectionString")), })
          .InstancePerLifetimeScope();
            builder.RegisterType<EnergyUsageByDeviceAccess>().As<IEnergyUsageByDeviceTypeAccess>().UsingConstructor(typeof(string))
          .WithParameters(new[] { new NamedParameter("sqlConnection", Configuration.GetConnectionString("SqlConnectionString")), })
          .InstancePerLifetimeScope();
            builder.RegisterType<EnergyUsageByTimeAccess>().As<IEnergyUsageByTimeAccess>().UsingConstructor(typeof(string))
          .WithParameters(new[] { new NamedParameter("sqlConnection", Configuration.GetConnectionString("SqlConnectionString")), })
          .InstancePerLifetimeScope();

            builder.RegisterType<EnergyUsageSummaryAccess>().As<IEnergyUsageSummaryAccess>().UsingConstructor(typeof(string))
        .WithParameters(new[] { new NamedParameter("sqlConnection", Configuration.GetConnectionString("SqlConnectionString")), })
        .InstancePerLifetimeScope();
        }
    }
}
