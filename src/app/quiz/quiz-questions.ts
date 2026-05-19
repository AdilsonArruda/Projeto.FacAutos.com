export interface QuizQuestion {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // ===== CATEGORY 1: Databricks Lakehouse Platform (24%) =====
  {
    id: 1,
    category: 'Databricks Lakehouse Platform',
    question: 'Which of the following is hosted completely in the control plane of the classic Databricks architecture?',
    options: [
      'Worker node',
      'JDBC data source',
      'Databricks web application',
      'Databricks Filesystem',
      'Driver node'
    ],
    correctAnswer: 2,
    explanation: 'The Databricks web application is hosted entirely in the control plane. Worker nodes, driver nodes, and DBFS reside in the data plane (customer\'s cloud account).'
  },
  {
    id: 2,
    category: 'Databricks Lakehouse Platform',
    question: 'Which of the following describes how a data lakehouse can help meet the needs of both machine learning and batch ETL/ELT workloads?',
    options: [
      'A data lakehouse requires very little data modeling',
      'A data lakehouse combines compute and storage for simple governance',
      'A data lakehouse provides autoscaling for compute clusters',
      'A data lakehouse fully exists in the cloud',
      'A data lakehouse stores unstructured data and is ACID-compliant'
    ],
    correctAnswer: 4,
    explanation: 'A data lakehouse supports unstructured data (needed for ML) while providing ACID compliance (needed for reliable ETL/ELT). This combination makes it suitable for both workloads.'
  },
  {
    id: 3,
    category: 'Databricks Lakehouse Platform',
    question: 'Which of the following describes the storage organization of a Delta table?',
    options: [
      'Delta tables are stored in a single file that contains data, history, metadata, and other attributes',
      'Delta tables store their data in a single file and all metadata in a collection of files in a separate location',
      'Delta tables are stored in a collection of files that contain data, history, metadata, and other attributes',
      'Delta tables are stored in a collection of files that contain only the data stored within the table',
      'Delta tables are stored in a single file that contains only the data stored within the table'
    ],
    correctAnswer: 2,
    explanation: 'Delta tables are stored as a collection of Parquet files along with a transaction log (_delta_log) directory containing JSON files with metadata, history, and other attributes.'
  },
  {
    id: 4,
    category: 'Databricks Lakehouse Platform',
    question: 'Which of the following describes a scenario in which a data engineer will want to use a Job cluster instead of an all-purpose cluster?',
    options: [
      'An ad-hoc analytics report needs to be developed while minimizing compute costs',
      'A data team needs to collaborate on the development of a machine learning model',
      'An automated workflow needs to be run every 30 minutes',
      'A Databricks SQL query needs to be scheduled for upward reporting',
      'A data engineer needs to manually investigate a production error'
    ],
    correctAnswer: 2,
    explanation: 'Job clusters are created and terminated automatically for each job run. They are ideal for automated, scheduled workloads as they reduce cost. All-purpose clusters are better for interactive, collaborative work.'
  },
  {
    id: 5,
    category: 'Databricks Lakehouse Platform',
    question: 'Which of the following benefits of using the Databricks Lakehouse Platform is provided by Delta Lake?',
    options: [
      'The ability to manipulate the same data using a variety of languages',
      'The ability to collaborate in real time on a single notebook',
      'The ability to set up alerts for query failures',
      'The ability to support batch and streaming workloads',
      'The ability to distribute complex data operations'
    ],
    correctAnswer: 3,
    explanation: 'Delta Lake provides unified batch and streaming support, allowing users to use the same Delta table as both a batch table and a streaming source/sink.'
  },
  {
    id: 6,
    category: 'Databricks Lakehouse Platform',
    question: 'Two junior data engineers are authoring separate parts of a single data pipeline notebook on separate Git branches. A senior engineer suggests a better alternative. Which feature supports the senior engineer\'s claim?',
    options: [
      'Databricks Notebooks support automatic change-tracking and versioning',
      'Databricks Notebooks support real-time coauthoring on a single notebook',
      'Databricks Notebooks support commenting and notification comments',
      'Databricks Notebooks support the use of multiple languages in the same notebook',
      'Databricks Notebooks support the creation of interactive data visualizations'
    ],
    correctAnswer: 1,
    explanation: 'Databricks Notebooks support real-time coauthoring, which means multiple engineers can collaborate on the same notebook simultaneously without needing separate Git branches.'
  },
  {
    id: 7,
    category: 'Databricks Lakehouse Platform',
    question: 'Which of the following describes the relationship between Databricks and Apache Spark?',
    options: [
      'Apache Spark is a component of the Databricks Lakehouse Platform that performs distributed data processing',
      'Databricks is a proprietary fork of Apache Spark with no connection to the open-source project',
      'Apache Spark and Databricks are competing products for big data processing',
      'Databricks replaces Apache Spark entirely with its own processing engine',
      'Apache Spark is only used in Databricks for machine learning workloads'
    ],
    correctAnswer: 0,
    explanation: 'Apache Spark is the core distributed processing engine used within the Databricks Lakehouse Platform. Databricks was founded by the creators of Apache Spark and extends it with enterprise features.'
  },
  {
    id: 8,
    category: 'Databricks Lakehouse Platform',
    question: 'What is the main advantage of using a Databricks Lakehouse over a traditional data warehouse?',
    options: [
      'Lakehouses only support structured data',
      'Lakehouses are always cheaper than data warehouses',
      'Lakehouses support structured, semi-structured, and unstructured data with ACID transactions',
      'Lakehouses do not require any data governance',
      'Lakehouses cannot be used for BI reporting'
    ],
    correctAnswer: 2,
    explanation: 'A data lakehouse combines the best features of data lakes (support for all data types) and data warehouses (ACID transactions, schema enforcement) in a single platform.'
  },
  {
    id: 9,
    category: 'Databricks Lakehouse Platform',
    question: 'In Databricks, what is a workspace?',
    options: [
      'A single notebook where code is executed',
      'An environment for accessing Databricks assets, including notebooks, clusters, and jobs',
      'A specific cluster configuration',
      'A data storage location in the cloud',
      'A version control system for notebooks'
    ],
    correctAnswer: 1,
    explanation: 'A Databricks workspace is an environment that provides access to all Databricks assets including notebooks, libraries, dashboards, experiments, clusters, jobs, tables, and more.'
  },
  {
    id: 10,
    category: 'Databricks Lakehouse Platform',
    question: 'Which of the following is a characteristic of the data plane in Databricks architecture?',
    options: [
      'It hosts the Databricks web application UI',
      'It manages user authentication and access control',
      'It is where the data is processed and stored in the customer\'s cloud account',
      'It stores notebook configurations and metadata',
      'It manages billing and subscription information'
    ],
    correctAnswer: 2,
    explanation: 'The data plane resides in the customer\'s cloud account and is where actual data processing and storage occurs. Clusters, DBFS, and data sources are all part of the data plane.'
  },

  // ===== CATEGORY 2: ELT with Spark SQL and Python (29%) =====
  {
    id: 11,
    category: 'ELT with Spark SQL and Python',
    question: 'Which of the following benefits is provided by the array functions from Spark SQL?',
    options: [
      'An ability to work with data in a variety of types at once',
      'An ability to work with data within certain partitions and windows',
      'An ability to work with time-related data in specified intervals',
      'An ability to work with complex, nested data ingested from JSON files'
    ],
    correctAnswer: 3,
    explanation: 'Array functions in Spark SQL are specifically designed for working with complex, nested data structures such as arrays and maps that are commonly found in JSON files.'
  },
  {
    id: 12,
    category: 'ELT with Spark SQL and Python',
    question: 'A data engineer has a new record to insert: id="a1", rank=6, rating=9.4. Which SQL command appends the new record to an existing Delta table my_table?',
    options: [
      'UPDATE VALUES (\'a1\', 6, 9.4) my_table',
      'UPDATE my_table VALUES (\'a1\', 6, 9.4)',
      'INSERT VALUES (\'a1\', 6, 9.4) INTO my_table',
      'INSERT INTO my_table VALUES (\'a1\', 6, 9.4)'
    ],
    correctAnswer: 3,
    explanation: 'The correct SQL syntax to append (insert) a new record into a table is INSERT INTO table_name VALUES (...). UPDATE is used to modify existing records, not insert new ones.'
  },
  {
    id: 13,
    category: 'ELT with Spark SQL and Python',
    question: 'Which SQL DDL command creates an empty Delta table, regardless of whether a table already exists with the same name?',
    options: [
      'CREATE OR REPLACE TABLE table_name WITH COLUMNS (id STRING, date DATE, rating FLOAT) USING DELTA',
      'CREATE TABLE IF NOT EXISTS table_name (id STRING, date DATE, rating FLOAT)',
      'CREATE TABLE table_name AS SELECT id STRING, date DATE, rating FLOAT',
      'CREATE OR REPLACE TABLE table_name (id STRING, date DATE, rating FLOAT)'
    ],
    correctAnswer: 3,
    explanation: 'CREATE OR REPLACE TABLE will create a new table or replace an existing one with the same name. This ensures the table is always created fresh regardless of whether it existed before.'
  },
  {
    id: 14,
    category: 'ELT with Spark SQL and Python',
    question: 'Which code snippet correctly aggregates the amount billed per day with unique invoices from a DataFrame billing_df?',
    options: [
      'billing_df.groupBy("billing_date").agg(sum("amount_billed").alias("total_revenue"), sum("billing_id").alias("total_invoices"))',
      'billing_df.groupBy("billing_date").agg(col("amount_billed").alias("total_revenue"), count("billing_id").alias("total_invoices"))',
      'billing_df.groupBy("billing_date").agg(sum("amount_billed").alias("total_revenue"), count_distinct("patient_id").alias("total_invoices"))',
      'billing_df.groupBy("billing_date").agg(sum("amount_billed").alias("total_revenue"), count_distinct("billing_id").alias("total_invoices"))'
    ],
    correctAnswer: 3,
    explanation: 'To get unique invoices, you need count_distinct("billing_id"). Using sum would incorrectly add IDs together, and count without distinct would include duplicates.'
  },
  {
    id: 15,
    category: 'ELT with Spark SQL and Python',
    question: 'Which of the following SQL commands can be used to remove a table from the Spark catalog while keeping the underlying data files?',
    options: [
      'DROP TABLE table_name',
      'DELETE FROM table_name',
      'DROP TABLE IF EXISTS table_name (only for external tables)',
      'TRUNCATE TABLE table_name',
      'REMOVE TABLE table_name'
    ],
    correctAnswer: 2,
    explanation: 'When you DROP an external table, only the metadata is removed from the catalog; the underlying data files are preserved. For managed tables, DROP removes both metadata and data.'
  },
  {
    id: 16,
    category: 'ELT with Spark SQL and Python',
    question: 'Which of the following Spark SQL functions can be used to extract specific fields from a JSON string column?',
    options: [
      'split()',
      'from_json()',
      'explode()',
      'collect_list()',
      'array_contains()'
    ],
    correctAnswer: 1,
    explanation: 'The from_json() function parses a JSON string column and converts it into a struct type, allowing you to access specific fields within the JSON data.'
  },
  {
    id: 17,
    category: 'ELT with Spark SQL and Python',
    question: 'What does the explode() function do in Spark SQL?',
    options: [
      'It splits a string into multiple columns',
      'It creates a new row for each element in an array or map column',
      'It aggregates multiple rows into a single row',
      'It converts a column to a different data type',
      'It removes duplicate rows from a table'
    ],
    correctAnswer: 1,
    explanation: 'The explode() function takes an array or map column and creates a new row for each element in the array (or key-value pair in the map), essentially flattening nested data.'
  },
  {
    id: 18,
    category: 'ELT with Spark SQL and Python',
    question: 'A data engineer needs to create a temporary view from a DataFrame df that is only accessible within the current Spark session. Which command should they use?',
    options: [
      'df.createGlobalTempView("my_view")',
      'df.createOrReplaceTempView("my_view")',
      'CREATE VIEW my_view AS SELECT * FROM df',
      'df.saveAsTable("my_view")',
      'df.write.format("view").save("my_view")'
    ],
    correctAnswer: 1,
    explanation: 'createOrReplaceTempView() creates a temporary view scoped to the current SparkSession. A global temp view would be accessible across sessions, which is not what was asked.'
  },
  {
    id: 19,
    category: 'ELT with Spark SQL and Python',
    question: 'Which of the following correctly describes the difference between a managed table and an external table in Databricks?',
    options: [
      'Managed tables can only store structured data, while external tables support all data types',
      'External tables are always faster than managed tables',
      'When a managed table is dropped, both metadata and data are deleted; when an external table is dropped, only metadata is deleted',
      'Managed tables cannot use Delta format',
      'External tables do not support ACID transactions'
    ],
    correctAnswer: 2,
    explanation: 'The key difference is lifecycle management: dropping a managed table removes both the metadata and the underlying data files, while dropping an external table only removes the metadata.'
  },
  {
    id: 20,
    category: 'ELT with Spark SQL and Python',
    question: 'What is the purpose of the MERGE INTO command in Delta Lake?',
    options: [
      'To combine two Delta tables into one permanently',
      'To perform upsert operations (insert new records and update existing ones) based on a matching condition',
      'To merge the schemas of two different tables',
      'To concatenate string columns in a table',
      'To join two tables for query purposes only'
    ],
    correctAnswer: 1,
    explanation: 'MERGE INTO performs upsert (UPDATE + INSERT) operations. It matches records between a source and target table based on a condition and can insert new records, update existing ones, or delete matched records.'
  },
  {
    id: 21,
    category: 'ELT with Spark SQL and Python',
    question: 'Which of the following SQL commands is used to add a new column to an existing Delta table?',
    options: [
      'UPDATE TABLE table_name ADD COLUMN col_name STRING',
      'ALTER TABLE table_name ADD COLUMNS (col_name STRING)',
      'MODIFY TABLE table_name ADD col_name STRING',
      'INSERT COLUMN col_name STRING INTO table_name',
      'CREATE COLUMN col_name STRING ON table_name'
    ],
    correctAnswer: 1,
    explanation: 'ALTER TABLE ... ADD COLUMNS is the correct DDL command to add new columns to an existing table in Spark SQL and Delta Lake.'
  },
  {
    id: 22,
    category: 'ELT with Spark SQL and Python',
    question: 'Which of the following is the correct way to read a CSV file with headers into a Spark DataFrame?',
    options: [
      'spark.read.csv("path/to/file.csv")',
      'spark.read.format("csv").option("header", "true").load("path/to/file.csv")',
      'spark.load.csv("path/to/file.csv", header=True)',
      'spark.read.text("path/to/file.csv").option("header", "true")',
      'spark.csv.read("path/to/file.csv", header=True)'
    ],
    correctAnswer: 1,
    explanation: 'The correct syntax uses spark.read.format("csv") with .option("header", "true") to indicate the first row contains column names, then .load() to specify the path.'
  },
  {
    id: 23,
    category: 'ELT with Spark SQL and Python',
    question: 'What is the purpose of the PIVOT clause in Spark SQL?',
    options: [
      'To rotate rows into columns, transforming unique values from one column into multiple columns',
      'To sort the results of a query in ascending or descending order',
      'To filter rows based on aggregated values',
      'To join two tables on a common column',
      'To create a backup of a table'
    ],
    correctAnswer: 0,
    explanation: 'PIVOT rotates data from rows to columns. It takes unique values from a specified column and turns them into separate columns, typically with an aggregation applied.'
  },

  // ===== CATEGORY 3: Incremental Data Processing (22%) =====
  {
    id: 24,
    category: 'Incremental Data Processing',
    question: 'What is the primary purpose of Auto Loader in Databricks?',
    options: [
      'To automatically optimize Delta tables',
      'To incrementally and efficiently process new data files as they arrive in cloud storage',
      'To automatically scale compute clusters',
      'To load data from JDBC sources',
      'To automatically create data visualizations'
    ],
    correctAnswer: 1,
    explanation: 'Auto Loader (cloudFiles) incrementally and efficiently processes new data files as they arrive in cloud storage. It automatically discovers new files without needing to track which files have been processed.'
  },
  {
    id: 25,
    category: 'Incremental Data Processing',
    question: 'Which of the following Spark Structured Streaming trigger modes processes all available data in a single micro-batch and then stops?',
    options: [
      'trigger(processingTime="10 seconds")',
      'trigger(once=True)',
      'trigger(continuous="1 second")',
      'trigger(availableNow=True)',
      'trigger(fixed="5 seconds")'
    ],
    correctAnswer: 1,
    explanation: 'trigger(once=True) processes all available data in a single micro-batch and then stops the stream. trigger(availableNow=True) processes available data in multiple micro-batches and stops.'
  },
  {
    id: 26,
    category: 'Incremental Data Processing',
    question: 'What is a checkpoint in Spark Structured Streaming?',
    options: [
      'A backup of the entire Spark cluster',
      'A mechanism to save the current state of a streaming query to enable fault tolerance and exactly-once processing',
      'A way to pause and resume a streaming query manually',
      'A validation step that checks data quality',
      'A log of all errors that occurred during streaming'
    ],
    correctAnswer: 1,
    explanation: 'Checkpoints store the current state and progress of a streaming query. They enable fault tolerance by allowing the query to recover from failures and guarantee exactly-once processing semantics.'
  },
  {
    id: 27,
    category: 'Incremental Data Processing',
    question: 'Which of the following correctly describes the COPY INTO command?',
    options: [
      'It copies data between two Delta tables',
      'It creates a copy of a table\'s schema without data',
      'It is an idempotent command that loads data from a file location into a Delta table',
      'It copies the table structure to a new database',
      'It creates a deep clone of a Delta table'
    ],
    correctAnswer: 2,
    explanation: 'COPY INTO is an idempotent SQL command that loads data from a file location into a Delta table. It tracks which files have been loaded to avoid processing duplicates.'
  },
  {
    id: 28,
    category: 'Incremental Data Processing',
    question: 'What is the difference between trigger(once=True) and trigger(availableNow=True) in Structured Streaming?',
    options: [
      'There is no difference; they behave identically',
      'once=True processes data in a single batch; availableNow=True processes data in multiple micro-batches before stopping',
      'once=True is for batch processing; availableNow=True is for continuous streaming',
      'once=True stops after a time limit; availableNow=True processes indefinitely',
      'availableNow=True is deprecated in favor of once=True'
    ],
    correctAnswer: 1,
    explanation: 'trigger(once=True) processes all available data in a single micro-batch. trigger(availableNow=True) processes all available data but splits it into multiple micro-batches, which can be more efficient for large volumes.'
  },
  {
    id: 29,
    category: 'Incremental Data Processing',
    question: 'Which format does Auto Loader use to read streaming data from cloud storage?',
    options: [
      'spark.readStream.format("delta")',
      'spark.readStream.format("cloudFiles")',
      'spark.readStream.format("autoloader")',
      'spark.readStream.format("stream")',
      'spark.readStream.format("fileStream")'
    ],
    correctAnswer: 1,
    explanation: 'Auto Loader uses the "cloudFiles" format. The correct syntax is spark.readStream.format("cloudFiles") to incrementally process new files from cloud storage.'
  },
  {
    id: 30,
    category: 'Incremental Data Processing',
    question: 'What happens when a Structured Streaming query with a checkpoint is restarted after a failure?',
    options: [
      'It reprocesses all data from the beginning',
      'It resumes from where it left off using the checkpoint information',
      'It creates a new empty output table',
      'It fails with an error requiring manual intervention',
      'It skips all previously seen data and only processes new data'
    ],
    correctAnswer: 1,
    explanation: 'The checkpoint stores the progress and state of the streaming query. When restarted, the query reads the checkpoint to determine where it left off and resumes processing from that point.'
  },
  {
    id: 31,
    category: 'Incremental Data Processing',
    question: 'Which of the following is a key advantage of using Auto Loader over COPY INTO for incremental data ingestion?',
    options: [
      'Auto Loader supports more file formats',
      'Auto Loader can efficiently discover new files using file notification, making it better for directories with millions of files',
      'Auto Loader does not require a checkpoint',
      'COPY INTO cannot handle JSON files',
      'Auto Loader works without Spark'
    ],
    correctAnswer: 1,
    explanation: 'Auto Loader uses file notification (cloud events) to efficiently discover new files, making it far more scalable than COPY INTO for directories with large numbers of files. COPY INTO must list all files in the directory each time.'
  },
  {
    id: 32,
    category: 'Incremental Data Processing',
    question: 'In Spark Structured Streaming, what does the watermark mechanism do?',
    options: [
      'It adds a timestamp column to the output',
      'It defines how late data can arrive and still be included in stateful aggregations before being dropped',
      'It creates a visual indicator of stream progress',
      'It limits the number of records processed per batch',
      'It encrypts streaming data for security'
    ],
    correctAnswer: 1,
    explanation: 'Watermarks define a threshold for how late data can arrive and still be processed. Data that arrives later than the watermark is considered too late and dropped, allowing the system to clean up old state.'
  },
  {
    id: 33,
    category: 'Incremental Data Processing',
    question: 'Which output mode in Structured Streaming outputs only the rows that have been updated since the last trigger?',
    options: [
      'Complete mode',
      'Append mode',
      'Update mode',
      'Delta mode',
      'Incremental mode'
    ],
    correctAnswer: 2,
    explanation: 'Update mode outputs only the rows that have changed since the last trigger. Complete mode outputs the entire result table. Append mode outputs only new rows (no updates).'
  },

  // ===== CATEGORY 4: Production Pipelines (16%) =====
  {
    id: 34,
    category: 'Production Pipelines',
    question: 'A Delta Live Table pipeline includes two STREAMING LIVE TABLE datasets and three LIVE TABLE datasets. It is configured in Development mode with Continuous Pipeline Mode. What happens after clicking Start?',
    options: [
      'All datasets will be updated at set intervals until the pipeline is shut down. Compute resources will persist for additional testing.',
      'All datasets will be updated once and the pipeline will shut down. Compute resources will persist for additional testing.',
      'All datasets will be updated once and the pipeline will shut down. Compute resources will be terminated.',
      'All datasets will be updated at set intervals until the pipeline is shut down. Compute resources will persist until shutdown.'
    ],
    correctAnswer: 3,
    explanation: 'In Continuous mode, the pipeline runs continuously, updating all datasets at set intervals. In Development mode, compute resources persist after the pipeline is stopped to allow for additional testing and debugging.'
  },
  {
    id: 35,
    category: 'Production Pipelines',
    question: 'What are expectations in Delta Live Tables?',
    options: [
      'Expected output schemas for each table',
      'Data quality constraints that can be used to validate data and handle violations',
      'Expected processing times for pipeline stages',
      'User-defined functions for data transformation',
      'Expected cluster sizes for pipeline execution'
    ],
    correctAnswer: 1,
    explanation: 'Expectations are Delta Live Tables\' way of defining data quality constraints. They can warn, drop invalid records, or fail the pipeline when data quality rules are violated.'
  },
  {
    id: 36,
    category: 'Production Pipelines',
    question: 'Which of the following correctly describes the medallion architecture in Databricks?',
    options: [
      'A security model with gold, silver, and bronze access levels',
      'A multi-hop data architecture that organizes data into bronze (raw), silver (cleaned), and gold (aggregated) layers',
      'A pricing tier system for Databricks workspaces',
      'A cluster configuration with three levels of compute power',
      'A backup strategy with three copies of data'
    ],
    correctAnswer: 1,
    explanation: 'The medallion architecture organizes data into three layers: Bronze (raw ingested data), Silver (cleaned and filtered data), and Gold (business-level aggregated data ready for analytics).'
  },
  {
    id: 37,
    category: 'Production Pipelines',
    question: 'Which of the following is a key feature of Databricks Jobs/Workflows?',
    options: [
      'They can only run single notebooks',
      'They cannot be scheduled and must be triggered manually',
      'They allow orchestration of multiple tasks with dependencies, schedules, and alerting',
      'They only support Python workloads',
      'They require all-purpose clusters'
    ],
    correctAnswer: 2,
    explanation: 'Databricks Jobs (Workflows) allow you to orchestrate multiple tasks (notebooks, JARs, SQL, Python scripts) with dependencies between them, scheduled triggers, retries, and alerting on failures.'
  },
  {
    id: 38,
    category: 'Production Pipelines',
    question: 'What is the purpose of the CONSTRAINT keyword in Delta Live Tables?',
    options: [
      'To enforce foreign key relationships between tables',
      'To define data quality expectations with actions like WARN, DROP ROW, or FAIL',
      'To set column-level permissions',
      'To limit the number of rows in a table',
      'To enforce unique indexes'
    ],
    correctAnswer: 1,
    explanation: 'In DLT, CONSTRAINT defines data quality expectations. ON VIOLATION actions include: no action (just log), DROP ROW (filter invalid rows), or FAIL UPDATE (stop the pipeline).'
  },
  {
    id: 39,
    category: 'Production Pipelines',
    question: 'Which of the following best describes the difference between Development and Production modes in Delta Live Tables?',
    options: [
      'Development mode uses smaller clusters; Production mode uses larger clusters',
      'Development mode retains compute resources for interactive debugging; Production mode immediately terminates resources after each update',
      'There is no difference; they are aliases for the same mode',
      'Development mode only processes a sample of data',
      'Production mode cannot use expectations'
    ],
    correctAnswer: 1,
    explanation: 'In Development mode, cluster resources are retained after a pipeline update to allow interactive debugging. In Production mode, resources are terminated immediately after the update completes to minimize cost.'
  },
  {
    id: 40,
    category: 'Production Pipelines',
    question: 'What does the OPTIMIZE command do when run on a Delta table?',
    options: [
      'It deletes all data from the table',
      'It creates an index on the table',
      'It compacts small files into larger ones to improve read performance',
      'It updates table statistics for the query optimizer',
      'It converts the table to a different file format'
    ],
    correctAnswer: 2,
    explanation: 'OPTIMIZE compacts small Parquet files into larger, more efficiently-sized files. This reduces the number of files that need to be read, improving query performance (especially after many small writes or streaming).'
  },

  // ===== CATEGORY 5: Data Governance (9%) =====
  {
    id: 41,
    category: 'Data Governance',
    question: 'Which command can be used to grant full permissions on a table to a team?',
    options: [
      'GRANT SELECT ON TABLE sales TO team',
      'GRANT USAGE ON TABLE sales TO team',
      'GRANT ALL PRIVILEGES ON TABLE sales TO team',
      'GRANT ALL PRIVILEGES ON TABLE team TO sales'
    ],
    correctAnswer: 2,
    explanation: 'GRANT ALL PRIVILEGES ON TABLE table_name TO principal grants all available permissions (SELECT, MODIFY, etc.) on the specified table to the specified team or user.'
  },
  {
    id: 42,
    category: 'Data Governance',
    question: 'What is Unity Catalog in Databricks?',
    options: [
      'A tool for creating data visualizations',
      'A unified governance solution for data and AI assets across Databricks workspaces',
      'A specific type of Delta table',
      'A cluster management tool',
      'A notebook version control system'
    ],
    correctAnswer: 1,
    explanation: 'Unity Catalog is Databricks\' unified governance solution that provides centralized access control, auditing, lineage, and data discovery across all Databricks workspaces.'
  },
  {
    id: 43,
    category: 'Data Governance',
    question: 'Which SQL command should a data engineer use to grant read-only access to a schema for an analyst group?',
    options: [
      'GRANT ALL PRIVILEGES ON SCHEMA sales_data TO analysts',
      'GRANT SELECT ON SCHEMA sales_data TO analysts',
      'GRANT INSERT ON SCHEMA sales_data TO analysts',
      'GRANT SELECT ON ALL TABLES IN SCHEMA sales_data TO analysts'
    ],
    correctAnswer: 1,
    explanation: 'GRANT SELECT ON SCHEMA grants read-only access to all current and future tables within the schema. This is more manageable than granting on individual tables.'
  },
  {
    id: 44,
    category: 'Data Governance',
    question: 'What is the three-level namespace hierarchy in Unity Catalog?',
    options: [
      'Database > Table > Column',
      'Workspace > Notebook > Cell',
      'Catalog > Schema > Table/View/Function',
      'Cluster > Job > Task',
      'Account > Workspace > User'
    ],
    correctAnswer: 2,
    explanation: 'Unity Catalog uses a three-level namespace: Catalog > Schema (Database) > Table/View/Function. This provides a hierarchical organization for data governance.'
  },
  {
    id: 45,
    category: 'Data Governance',
    question: 'What is the purpose of the VACUUM command in Delta Lake?',
    options: [
      'To compress data files for better storage efficiency',
      'To remove data files that are no longer referenced by the Delta table transaction log, reclaiming storage space',
      'To delete all records from a Delta table',
      'To optimize query performance by creating indexes',
      'To back up the Delta table to a remote location'
    ],
    correctAnswer: 1,
    explanation: 'VACUUM removes data files that are no longer referenced by the Delta table\'s transaction log (i.e., old versions). By default, it retains files for 7 days to support time travel. Files older than the retention period are permanently deleted.'
  }
];
