import sqlalchemy as db

def connect():
    engine = create_engine(
        "postgresql+pg8000://postgre:Azerty12@localhost/Drones",
        execution_options={
            "isolation_level": "REPEATABLE READ"
        }
    )
    connection = engine.connect()
    metadata = db.MetaData()
    tb_drones = db.Table('Drones', metadata, autoload=True, autoload_with=engine)